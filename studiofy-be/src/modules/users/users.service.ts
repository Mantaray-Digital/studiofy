import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserWithoutPassword } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action, AppAbility } from 'src/ability/ability.factory';
import { ClientProxy } from '@nestjs/microservices';
import { GcsService } from 'src/gcs/gcs.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createHash } from 'crypto';
import { UserStatus } from './enums/user-status';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private readonly abilityFactory: AbilityFactory,
    private readonly gcsService: GcsService,
    private eventEmitter: EventEmitter2,
    @Inject('EMAIL_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password');
  }

  async create(
    user: CreateUserDto,
    status: UserStatus = UserStatus.PENDING,
  ): Promise<UserDocument> {
    const userData: Partial<UserWithoutPassword> = {
      ...user,
      status,
    };

    const createdUser = await this.userModel.create(userData);

    if (createdUser) {
      this.rabbitClient.emit('hommie_welcome_email', {
        to: user.email,
        subject: 'Welcome to Hommie Stays!',
        data: {
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
        },
      });
    }

    return createdUser;
  }

  private async _updateProfilePicture(
    userToUpdate: UserDocument,
    newUser: Partial<UpdateUserDto>,
    file?: Express.Multer.File,
  ): Promise<void> {
    if (!file) return;

    const uploadedImage = await this.gcsService.uploadPublicFile(file);
    const newProfilePicUrl = uploadedImage.url;

    if (userToUpdate.profilePic) {
      try {
        const key = this.gcsService.extractFileKeyFromUrl(userToUpdate.profilePic);
        this.eventEmitter.emit('gcs.delete_file', key);
      } catch (error) {
        console.error('Failed to delete old profile picture:', error.message || error);
      }
    }

    newUser.profilePic = newProfilePicUrl;
  }

  async update(
    id: string,
    newUser: UpdateUserDto,
    ability: AppAbility,
    { profilePic, identity }: { profilePic?: Express.Multer.File; identity?: Express.Multer.File[] },
  ): Promise<User | null> {
    const userToUpdate = await this.userModel.findById(id);
    if (!userToUpdate) throw new Error('User not found');

    if (ability.cannot(Action.Update, userToUpdate)) {
      throw new ForbiddenException('You cannot update this user');
    }

    await this._updateProfilePicture(userToUpdate, newUser, profilePic);

    return await this.userModel.findByIdAndUpdate(
      id,
      { $set: newUser },
      { new: true },
    );
  }

  async findByToken(token: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({
      passwordRestToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  async setVerifyEmailToken(userId: string): Promise<{ rawToken: string }> {
    const rawToken = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedToken = createHash('sha256').update(rawToken).digest('hex');

    await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        verifyEmailToken: hashedToken,
        verifyEmailExpires: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return { rawToken };
  }

  async findByVerifyEmailToken(token: string): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      {
        verifyEmailToken: token,
        verifyEmailExpires: { $gt: Date.now() },
      },
      {
        $unset: {
          verifyEmailToken: '',
          verifyEmailExpires: '',
        },
        $set: {
          status: UserStatus.ACTIVE,
        },
      },
      { new: true },
    );

    if (!user) throw new BadRequestException('Invalid or expired token');
    return user;
  }
}
