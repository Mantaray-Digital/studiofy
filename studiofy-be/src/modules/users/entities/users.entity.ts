import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserStatus } from '../enums/user-status';
import { UserRole } from '../enums/user-role';
import { BillingRecord, BillingRecordSchema } from './billing.entity';

export type UserDocument = HydratedDocument<User>;

export type UserWithoutPassword = Omit<User, 'validatePassword' | 'createPasswordRestToken'>;

// Define the populated user type

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
    type: String,
  })
  email: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ required: true, select: false })
  password?: string;

  @Prop({ type: String, default: '' })
  profilePic: string;

  @Prop({ select: false })
  passwordRestToken?: string;

  @Prop({ select: false })
  passwordResetExpires?: number;

  @Prop({ select: false })
  verifyEmailToken?: string;

  @Prop({ select: false })
  verifyEmailExpires?: Date;

  @Prop({ enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;
  
  @Prop({enum:UserRole, default: UserRole.USER})
  roles: UserRole;

  @Prop({ default: 'FREE' }) 
  plan: string; // 'FREE', 'PRO', 'AGENCY'

  @Prop({ default: 0 })
  credits_used: number;

  @Prop({ default: 5 }) 
  credits_total: number; 

  @Prop()
  renewal_date: Date;

  @Prop({ type: [BillingRecordSchema], default: [] })
  billing_history: BillingRecord[];


  validatePassword: (this: UserDocument, password: string) => Promise<boolean>;
  createPasswordRestToken: (this: UserDocument) => string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Hash the password before saving the document
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

UserSchema.methods.validatePassword = async function (this: UserDocument, password: string): Promise<boolean> {
  if (!password) {
    throw new Error('Password is required for validation');
  }

  if (!this.password) {
    throw new Error('Hashed password is not set on the user document');
  }

  return bcrypt.compare(password, this.password);
};

UserSchema.methods.createPasswordRestToken = function (this: UserDocument) {
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordRestToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
