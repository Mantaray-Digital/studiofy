import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId; 

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  thumbnail_url: string; 

  @Prop({ type: Object })
  meta: any; 

  @Prop({ default: false })
  is_archived: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ user: 1, createdAt: -1 });
