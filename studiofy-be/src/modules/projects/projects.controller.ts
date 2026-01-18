import { Controller, Get, HttpStatus, Query, UseGuards, HttpCode } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import type { UserDocument } from '../users/entities/users.entity';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Projects retrieved successfully')
  async getUserProjects(
    @UserParam() user: UserDocument,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;

    return this.projectsService.findAllByUser(
        user._id.toString(), 
        pageNum,
        limitNum
    );
  }
}