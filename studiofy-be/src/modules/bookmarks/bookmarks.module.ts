import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { Bookmark, BookmarkSchema } from './entities/bookmark.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}