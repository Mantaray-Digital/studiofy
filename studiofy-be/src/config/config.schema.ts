import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export class ConfigSchema {
  @IsString()
  DATABASE: string;
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRES_IN: string;
  @IsString()
  REFRESHTOKEN_EXPIRES_IN: string;
  @Transform(({ value }) => parseInt(value, 10))
  ACCESSTOKEN_COOKIE_EXPIRES_IN: number;
  @Transform(({ value }) => parseInt(value, 10))
  REFRESHTOKEN_COOKIE_EXPIRES_IN: number;
  @Transform(({ value }) => parseInt(value, 10))
  CACHE_TTL: number;
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;
  @Transform(({ value }) => parseInt(value, 10))
  PORT: number;
  @IsString()
  HOSTEX_API_URL: string;
  @IsString()
  HOSTEX_API_KEY: string;
  @IsString()
  HOSTEX_WEBHOOK_SECRET_TOKEN: string;
  @IsString()
  bucketName: string;
  @IsString()
  projectId: string;
  @IsString()
  GCLOUD_KEY_JSON: string;
  @IsString()
  HOSTEX_CUSTOM_CHANNEL_ID: string;
  @IsString()
  PAYMOB_INTEGRATION_ID: string;
  @IsString()
  PAYMOB_API_KEY: string;
  @IsString()
  PAYMOB_PUBLIC_KEY: string;
  @IsString()
  PAYMOB_SECRET_KEY: string;
  @IsString()
  PAYMOB_HMAC_SECRET: string;
  @IsString()
  PAYMOB_BASE_URL: string;
  @IsString()
  PAYMOB_CHECKOUT_URL: string;
  @IsString()
  RABBITMQ_URL: string;
  @IsString()
  GOOGLE_CLIENT_ID: string;
  @IsString()
  GOOGLE_CLIENT_SECRET: string;
  @IsString()
  GOOGLE_CALLBACK_URL: string;
  @IsString()
  FRONTEND_URL: string;
  @IsString()
  REDIS_URL: string;
}
