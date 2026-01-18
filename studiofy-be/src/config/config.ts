import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigSchema } from './config.schema';

export default () => {
  const config = {
    DATABASE: process.env.DATABASE, // Flat structure
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    REFRESHTOKEN_EXPIRES_IN: process.env.REFRESHTOKEN_EXPIRES_IN,
    ACCESSTOKEN_COOKIE_EXPIRES_IN: process.env.ACCESSTOKEN_COOKIE_EXPIRES_IN,
    REFRESHTOKEN_COOKIE_EXPIRES_IN: process.env.REFRESHTOKEN_COOKIE_EXPIRES_IN,
    CACHE_TTL: process.env.CACHE_TTL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,

    REDIS_URL: process.env.REDIS_URL,

    PAYMOB_API_KEY: process.env.PAYMOB_API_KEY,
    PAYMOB_PUBLIC_KEY: process.env.PAYMOB_PUBLIC_KEY,
    PAYMOB_SECRET_KEY: process.env.PAYMOB_SECRET_KEY,
    PAYMOB_INTEGRATION_ID: process.env.PAYMOB_INTEGRATION_ID,
    PAYMOB_HMAC_SECRET: process.env.PAYMOB_HMAC_SECRET,
    PAYMOB_BASE_URL: process.env.PAYMOB_BASE_URL,
    PAYMOB_CHECKOUT_URL: process.env.PAYMOB_CHECKOUT_URL,

    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    bucketName: process.env.bucketName,
    projectId: process.env.projectId,
    GCLOUD_KEY_JSON: process.env.GCLOUD_KEY_JSON,
    RABBITMQ_URL: process.env.RABBITMQ_URL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  };

  // Transform and validate the configuration
  const validatedConfig = plainToInstance(ConfigSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(`Configuration validation error: ${errors.map((error) => Object.values(error.constraints || {}).join(', ')).join('; ')}`);
  }

  return validatedConfig;
};
