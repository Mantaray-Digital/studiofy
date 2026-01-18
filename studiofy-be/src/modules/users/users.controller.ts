import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Action, type AppAbility } from 'src/ability/ability.factory';
import { AbilitiesGuard } from '../../guards/abilities.guard';
import { CheckAbility } from 'src/Decorator/abilities.decorator';
import { User, type UserDocument } from './entities/users.entity';
import { AbilityParam } from 'src/Decorator/ability-param.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ResponseMessage('User profile retrieved successfully')
  async findOne(@UserParam() user: UserDocument) {
    return await this.usersService.findById(user._id.toString());
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbility({
    action: Action.Update,
    subject: User,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'identity', maxCount: 1 },
    ]),
  )
  @Patch(':id')
  @ResponseMessage('User profile updated successfully')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AbilityParam() ability: AppAbility,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      identity?: Express.Multer.File[];
    },
  ) {
    return await this.usersService.update(id, updateUserDto, ability, {
      profilePic: files?.profilePic?.[0], // single file
      identity: files?.identity || [], // keep all uploaded identity files
    });
  }
}
