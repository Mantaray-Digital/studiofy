import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/entities/users.entity';
import { CreditTransactionType } from '../users/entities/billing.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getBillingHistory(userId: string, page: number = 1, limit: number = 10) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const billingHistory = user.billing_history || [];
    const total = billingHistory.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    // Sort by date descending and paginate
    const sortedHistory = [...billingHistory]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const paginatedHistory = sortedHistory.slice(skip, skip + limit);

    // Transform to match frontend expected format
    const invoices = paginatedHistory.map((record, index) => ({
      id: `inv_${user._id}_${skip + index}`,
      invoiceNumber: `INV-${new Date(record.date).getFullYear()}-${String(skip + index + 1).padStart(4, '0')}`,
      date: record.date.toISOString(),
      amount: record.amount,
      status: 'paid' as const,
      downloadUrl: record.invoice_url,
    }));

    return {
      invoices,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getInvoice(userId: string, invoiceId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    // Parse invoice ID to get index
    const parts = invoiceId.split('_');
    if (parts.length < 3) throw new NotFoundException('Invoice not found');

    const index = parseInt(parts[2], 10);
    if (isNaN(index) || index < 0 || index >= user.billing_history.length) {
      throw new NotFoundException('Invoice not found');
    }

    const record = user.billing_history[index];
    return {
      id: invoiceId,
      invoiceNumber: `INV-${new Date(record.date).getFullYear()}-${String(index + 1).padStart(4, '0')}`,
      date: record.date.toISOString(),
      amount: record.amount,
      status: 'paid' as const,
      downloadUrl: record.invoice_url,
    };
  }

  async addBillingRecord(userId: string, amount: number, invoiceUrl: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          billing_history: {
            date: new Date(),
            amount,
            invoice_url: invoiceUrl,
          },
        },
      },
      { new: true },
    );

    if (!user) throw new BadRequestException('User not found');
    return user.billing_history[user.billing_history.length - 1];
  }

  async getCreditHistory(userId: string, page: number = 1, limit: number = 20) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const creditHistory = user.credit_history || [];
    const total = creditHistory.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    // Sort by createdAt descending and paginate
    const sortedHistory = [...creditHistory].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    );

    const paginatedHistory = sortedHistory.slice(skip, skip + limit);

    // Transform to match expected response format
    const data = paginatedHistory.map((record) => ({
      id: record._id.toString(),
      type: record.type,
      description: record.description,
      amount: record.amount,
      balanceAfter: record.balanceAfter,
      createdAt: record.createdAt?.toISOString() || new Date().toISOString(),
      resourceId: record.resourceId?.toString() || null,
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async addCreditTransaction(
    userId: string,
    type: CreditTransactionType,
    description: string,
    amount: number,
    balanceAfter: number,
    resourceId?: string,
  ) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          credit_history: {
            _id: new Types.ObjectId(),
            type,
            description,
            amount,
            balanceAfter,
            resourceId: resourceId ? new Types.ObjectId(resourceId) : null,
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    );

    if (!user) throw new BadRequestException('User not found');
    return user.credit_history[user.credit_history.length - 1];
  }
}
