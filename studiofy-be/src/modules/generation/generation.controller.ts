import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerationService } from './generation.service';
import { GenerateDto } from './dto/generate.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import type { UserDocument } from '../users/entities/users.entity';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';

@Controller('generate')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Assets generated successfully')
  @UseInterceptors(FileInterceptor('image'))
  async generate(
    @UserParam() user: UserDocument,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: GenerateDto,
  ) {
    if (!image) {
      throw new BadRequestException('Image is required');
    }

    return this.generationService.generateAssets(user._id.toString(), image, dto);
  }
}
