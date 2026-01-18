import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectDocument,Project,ProjectSchema } from './entities/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}


  async create(userId: string, name: string, thumbnail: string, meta: any) {
    return this.projectModel.create({
      user: new Types.ObjectId(userId), 
      name,
      thumbnail_url: thumbnail,
      meta,
    });
  }

  async findAllByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const userObjectId = new Types.ObjectId(userId);

    const [projects, totalDocs] = await Promise.all([
      this.projectModel
        .find({ user: userObjectId, is_archived: false }) 
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('name thumbnail_url createdAt meta') 
        .exec(),
      this.projectModel.countDocuments({ user: userObjectId, is_archived: false }),
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
}