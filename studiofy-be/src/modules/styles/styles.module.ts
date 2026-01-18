import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StylesController } from './styles.controller';
import { StylesService } from './styles.service';
import { Style, StyleSchema } from './entities/style.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Style.name, schema: StyleSchema }]),
  ],
  controllers: [StylesController],
  providers: [StylesService],
  exports: [StylesService],
})
export class StylesModule {}
