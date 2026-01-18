import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bookmark, BookmarkDocument } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

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