import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ _id: false })
export class ProjectOutputs {
  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: '' })
  caption: string;
}

@Schema({ _id: false })
export class ProjectMeta {
  @Prop()
  productContext: string;

  @Prop()
  styleProfile: string;

  @Prop({ default: 1 })
  quantity: number;
}

@Schema({ _id: false })
export class ProjectMetadata {
  @Prop({ default: 0 })
  tokensIn: number;

  @Prop({ default: 0 })
  tokensOut: number;

  @Prop({ default: 0 })
  imageCount: number;

  @Prop({ default: 0 })
  googleCostUsd: number;

  @Prop({ default: 0 })
  userPriceUsd: number;

  @Prop({ default: 0 })
  profitUsd: number;

  @Prop({ default: 3 })
  margin: number;
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  thumbnailUrl: string;

  @Prop({ type: ProjectOutputs, default: () => ({ images: [], caption: '' }) })
  outputs: ProjectOutputs;

  @Prop({ type: ProjectMeta })
  meta: ProjectMeta;

  @Prop({ type: ProjectMetadata })
  metadata: ProjectMetadata;

  @Prop({ default: false })
  isArchived: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ user: 1, createdAt: -1 });
