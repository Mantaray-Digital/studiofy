import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';


export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema({ timestamps: true, collection: 'user_bookmarks' }) 
export class Bookmark {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: true })
  project: Types.ObjectId;

  @Prop({ required: true, enum: ['image', 'text'] })
  type: string;

  @Prop({ required: true })
  content: string; // The Image URL or the Text string

  @Prop({ type: Object })
  meta?: any; 
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);


BookmarkSchema.index({ user: 1, content: 1 }, { unique: true });