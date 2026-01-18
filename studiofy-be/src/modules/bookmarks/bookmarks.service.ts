import { Injectable, ConflictException, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bookmark, BookmarkDocument } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { User, UserDocument } from '../users/entities/users.entity';
import { Project, ProjectDocument } from '../projects/entities/projects.entity';

const DEFAULT_BOOKMARKS = [
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
  },
];

@Injectable()
export class BookmarksService implements OnModuleInit {
  private readonly logger = new Logger(BookmarksService.name);

  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async onModuleInit() {
    await this.seedBookmarksIfEmpty();
  }

  private async seedBookmarksIfEmpty() {
    const count = await this.bookmarkModel.countDocuments();
    if (count > 0) {
      this.logger.log(`Found ${count} existing bookmarks, skipping seed`);
      return;
    }

    // Find a user to associate bookmarks with
    const user = await this.userModel.findOne();
    if (!user) {
      this.logger.warn('No users found, cannot seed bookmarks');
      return;
    }

    // Find or create a project for bookmarks
    let project = await this.projectModel.findOne({ user: user._id });
    if (!project) {
      project = await this.projectModel.create({
        user: user._id,
        name: 'Sample Product Photos',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        outputs: {
          images: DEFAULT_BOOKMARKS.map(b => b.content),
          caption: 'Sample product photography collection',
        },
      });
      this.logger.log(`Created sample project: ${project.name}`);
    }

    // Create bookmarks
    const bookmarksToCreate = DEFAULT_BOOKMARKS.map(bookmark => ({
      user: user._id,
      project: project._id,
      type: bookmark.type,
      content: bookmark.content,
    }));

    await this.bookmarkModel.insertMany(bookmarksToCreate);
    this.logger.log(`Seeded ${bookmarksToCreate.length} default bookmarks for user ${user.email}`);
  }

  async create(userId: string, dto: CreateBookmarkDto) {
    try {
      const newBookmark = await this.bookmarkModel.create({
        user: new Types.ObjectId(userId),
        project: new Types.ObjectId(dto.projectId),
        type: dto.type,
        content: dto.content,
      });
      return newBookmark;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('You have already bookmarked this item.');
      }
      throw error;
    }
  }

  async findAllByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const userObjectId = new Types.ObjectId(userId);

    // Check if user has any bookmarks, if not seed some for them
    const userBookmarkCount = await this.bookmarkModel.countDocuments({ user: userObjectId });
    if (userBookmarkCount === 0) {
      await this.seedBookmarksForUser(userId);
    }

    const [bookmarks, totalDocs] = await Promise.all([
      this.bookmarkModel
        .find({ user: userObjectId })
        .populate('project', 'name thumbnail_url')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookmarkModel.countDocuments({ user: userObjectId }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      data: bookmarks,
      page,
      limit,
      totalDocs,
      totalPages,
    };
  }

  private async seedBookmarksForUser(userId: string) {
    const userObjectId = new Types.ObjectId(userId);

    // Find or create a project for the user's bookmarks
    let project = await this.projectModel.findOne({ user: userObjectId });
    if (!project) {
      project = await this.projectModel.create({
        user: userObjectId,
        name: 'Sample Product Photos',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        outputs: {
          images: DEFAULT_BOOKMARKS.map(b => b.content),
          caption: 'Sample product photography collection',
        },
      });
      this.logger.log(`Created sample project for user ${userId}`);
    }

    // Create bookmarks for this user
    const bookmarksToCreate = DEFAULT_BOOKMARKS.map(bookmark => ({
      user: userObjectId,
      project: project._id,
      type: bookmark.type,
      content: bookmark.content,
    }));

    await this.bookmarkModel.insertMany(bookmarksToCreate);
    this.logger.log(`Seeded ${bookmarksToCreate.length} default bookmarks for user ${userId}`);
  }

  async remove(userId: string, bookmarkId: string) {
    const deleted = await this.bookmarkModel.findOneAndDelete({
      _id: bookmarkId,
      user: new Types.ObjectId(userId), 
    });

    if (!deleted) {
      throw new NotFoundException('Bookmark not found');
    }

    return { success: true, id: bookmarkId };
  }
}