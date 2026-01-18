import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument, Types } from 'mongoose';

export type BillingRecordDocument = HydratedDocument<BillingRecord>;

@Schema()
export class BillingRecord {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  invoice_url: string;
}
export const BillingRecordSchema = SchemaFactory.createForClass(BillingRecord);