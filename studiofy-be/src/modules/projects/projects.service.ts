import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectDocument, Project } from './entities/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(userId: string, data: CreateProjectDto) {
    return this.projectModel.create({
      user: new Types.ObjectId(userId),
      name: data.name,
      thumbnailUrl: data.thumbnailUrl || '',
      outputs: data.outputs || { images: [], caption: '' },
      meta: data.meta,
      metadata: data.metadata,
    });
  }

  async findAllByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const userObjectId = new Types.ObjectId(userId);

    const [projects, totalDocs] = await Promise.all([
      this.projectModel
        .find({ user: userObjectId, isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('name thumbnailUrl outputs meta createdAt')
        .exec(),
      this.projectModel.countDocuments({ user: userObjectId, isArchived: false }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      data: projects,
      page,
      limit,
      totalDocs,
      totalPages,
    };
  }

  async findOne(userId: string, projectId: string) {
    return this.projectModel.findOne({
      _id: projectId,
      user: new Types.ObjectId(userId),
    });
  }

  async delete(userId: string, projectId: string) {
    const result = await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
        user: new Types.ObjectId(userId),
      },
      { $set: { isArchived: true } },
      { new: true },
    );
    if (!result) {
      throw new Error('Project not found or not authorized');
    }
    return result;
  }
}
