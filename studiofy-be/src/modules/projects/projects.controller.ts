import { Controller, Get, Post, Delete, HttpStatus, Query, Param, Body, UseGuards, HttpCode, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
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
    @Query('limit') limit: string = '20',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;

    return this.projectsService.findAllByUser(user._id.toString(), pageNum, limitNum);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Project created successfully')
  async createProject(@UserParam() user: UserDocument, @Body() body: CreateProjectDto) {
    return this.projectsService.create(user._id.toString(), body);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Project retrieved successfully')
  async getProject(@UserParam() user: UserDocument, @Param('id') projectId: string) {
    const project = await this.projectsService.findOne(user._id.toString(), projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Project deleted successfully')
  async deleteProject(@UserParam() user: UserDocument, @Param('id') projectId: string) {
    try {
      await this.projectsService.delete(user._id.toString(), projectId);
      return null;
    } catch {
      throw new NotFoundException('Project not found or not authorized');
    }
  }
}
