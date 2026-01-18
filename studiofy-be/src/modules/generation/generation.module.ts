import { Module } from '@nestjs/common';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';
import { GcsModule } from 'src/gcs/gcs.module';
import { ProjectsModule } from '../projects/projects.module';
import { StylesModule } from '../styles/styles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [GcsModule, ProjectsModule, StylesModule, UsersModule],
  controllers: [GenerationController],
  providers: [GenerationService],
  exports: [GenerationService],
})
export class GenerationModule {}
