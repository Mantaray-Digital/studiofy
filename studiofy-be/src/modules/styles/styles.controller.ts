import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { StylesService } from './styles.service';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';

@Controller('styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Styles fetched successfully')
  async findAll() {
    return this.stylesService.findAll();
  }

  @Get('free')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Free styles fetched successfully')
  async getFreeStyles() {
    return this.stylesService.getFreeStyles();
  }

  @Get('premium')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Premium styles fetched successfully')
  async getPremiumStyles() {
    return this.stylesService.getPremiumStyles();
  }
}
