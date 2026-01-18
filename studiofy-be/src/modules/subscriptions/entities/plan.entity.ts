import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, uppercase: true })
  tier: string; // 'FREE', 'PRO', 'AGENCY'

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ default: 0 })
  yearlyPrice: number;

  @Prop({ required: true, default: 0 })
  creditsGiven: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ default: false })
  isPopular: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  sortOrder: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
PlanSchema.set('toJSON', { virtuals: true });
PlanSchema.set('toObject', { virtuals: true });
