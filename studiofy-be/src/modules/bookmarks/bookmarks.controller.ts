import { Controller, Get, Post, Delete,  Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';
import type { UserDocument } from '../users/entities/users.entity';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Item bookmarked successfully')
  async create(
    @UserParam() user: UserDocument,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarksService.create(user._id.toString(), dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Bookmarks retrieved successfully')
  async findAll(
    @UserParam() user: UserDocument,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    
    return this.bookmarksService.findAllByUser(
      user._id.toString(), 
      pageNum, 
      limitNum
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Bookmark removed successfully')
  async remove(
    @UserParam() user: UserDocument,
    @Param('id') id: string,
  ) {
    return this.bookmarksService.remove(user._id.toString(), id);
  }
}