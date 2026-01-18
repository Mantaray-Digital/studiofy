import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { AbilityModule } from './ability/ability.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GcsModule } from './gcs/gcs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from './modules/projects/projects.module';
import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { BillingModule } from './modules/billing/billing.module';
import { StylesModule } from './modules/styles/styles.module';
import { GenerationModule } from './modules/generation/generation.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    JwtModule.register({
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN as any) ?? '1h' },
      global: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: config.getOrThrow<string>('REDIS_URL'),
      }),
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'EMAIL_SERVICE',
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [config.getOrThrow<string>('RABBITMQ_URL')],
              queue: 'email_queue',
            },
          }),
        },
      ],
    }),
    EventEmitterModule.forRoot(),
    AbilityModule,
    AuthModule,
    UsersModule,
    GcsModule,
    ProjectsModule,
    BookmarksModule,
    SubscriptionsModule,
    BillingModule,
    StylesModule,
    GenerationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*path');
  }
}
