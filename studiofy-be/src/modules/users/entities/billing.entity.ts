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

// Credit Transaction Types
export enum CreditTransactionType {
  USAGE = 'USAGE',
  REFUND = 'REFUND',
  PURCHASE = 'PURCHASE',
  BONUS = 'BONUS',
}

export type CreditTransactionDocument = HydratedDocument<CreditTransaction>;

@Schema({ timestamps: true })
export class CreditTransaction {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, enum: CreditTransactionType })
  type: CreditTransactionType;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  balanceAfter: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, default: null })
  resourceId: Types.ObjectId | null;

  createdAt?: Date;
}
export const CreditTransactionSchema = SchemaFactory.createForClass(CreditTransaction);