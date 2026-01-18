import { Controller, Get, Param, Query, Res, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import * as express from 'express';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserParam } from 'src/Decorator/user-param.decorator';
import type { UserDocument } from '../users/entities/users.entity';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Billing history retrieved successfully')
  async getBillingHistory(
    @UserParam() user: UserDocument,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return this.billingService.getBillingHistory(
      user._id.toString(),
      pageNum,
      limitNum,
    );
  }

  @Get('invoice/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Invoice retrieved successfully')
  async getInvoice(
    @UserParam() user: UserDocument,
    @Param('id') invoiceId: string,
  ) {
    return this.billingService.getInvoice(user._id.toString(), invoiceId);
  }

  @Get('invoice/:id/download')
  @UseGuards(JwtAuthGuard)
  async downloadInvoice(
    @UserParam() user: UserDocument,
    @Param('id') invoiceId: string,
    @Res() res: express.Response,
  ) {
    const invoice = await this.billingService.getInvoice(
      user._id.toString(),
      invoiceId,
    );

    // If invoice has a download URL, redirect to it
    if (invoice.downloadUrl) {
      return res.redirect(invoice.downloadUrl);
    }

    // Otherwise return a simple text receipt
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${invoice.invoiceNumber}.txt"`,
    );
    res.send(
      `Invoice: ${invoice.invoiceNumber}\nDate: ${invoice.date}\nAmount: $${invoice.amount}\nStatus: ${invoice.status}`,
    );
  }

  @Get('credits/history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get credit history successfully')
  async getCreditHistory(
    @UserParam() user: UserDocument,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    return this.billingService.getCreditHistory(
      user._id.toString(),
      pageNum,
      limitNum,
    );
  }
}
