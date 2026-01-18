import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StyleDocument = HydratedDocument<Style>;

@Schema({ timestamps: true })
export class Style {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  promptTemplate: string;

  @Prop({ default: '' })
  thumbnailUrl: string;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  sortOrder: number;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
StyleSchema.set('toJSON', { virtuals: true });
StyleSchema.set('toObject', { virtuals: true });
