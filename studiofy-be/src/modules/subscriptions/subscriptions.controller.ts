import { Controller, Get, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import type { UserDocument } from '../users/entities/users.entity';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscription plans retrieved successfully')
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Current subscription retrieved successfully')
  async getCurrentSubscription(@UserParam() user: UserDocument) {
    return this.subscriptionsService.getCurrentSubscription(user._id.toString());
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscription dashboard retrieved successfully')
  async getDashboard(@UserParam() user: UserDocument) {
    return this.subscriptionsService.getDashboard(user._id.toString());
  }

  @Post('upgrade')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscription upgraded successfully')
  async upgradePlan(
    @UserParam() user: UserDocument,
    @Body() body: { planId: string; billingPeriod: 'month' | 'year' },
  ) {
    return this.subscriptionsService.upgradePlan(
      user._id.toString(),
      body.planId,
      body.billingPeriod,
    );
  }

  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscription cancelled successfully')
  async cancelSubscription(@UserParam() user: UserDocument) {
    return this.subscriptionsService.cancelSubscription(user._id.toString());
  }
}
