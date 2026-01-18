import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SecretDocument = HydratedDocument<Secrets>;

@Schema({ timestamps: true })
export class Secrets {
  @Prop({ required: true })
  jwtSecret: string;

  @Prop({ required: true })
  refreshJwtSecret: string;
}

export const SecretsSchema = SchemaFactory.createForClass(Secrets);
