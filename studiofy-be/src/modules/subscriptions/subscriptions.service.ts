import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/users.entity';
import { Plan, PlanDocument } from './entities/plan.entity';

// Default plans for seeding the database
const DEFAULT_PLANS = [
  {
    name: 'Free',
    tier: 'FREE',
    description: 'Pay as you go with standard margins',
    price: 0,
    yearlyPrice: 0,
    creditsGiven: 50,
    features: ['Standard Generation Speed', 'Pay as you go'],
    isPopular: false,
    isActive: true,
    sortOrder: 0,
  },
  {
    name: 'Pro',
    tier: 'PRO',
    description: 'For professional photographers and small businesses',
    price: 29,
    yearlyPrice: 290,
    creditsGiven: 100,
    features: [
      '100 image generations per month',
      'Premium backgrounds',
      'HD quality',
      'Priority support',
      'Custom styles',
      'API access',
    ],
    isPopular: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'Agency',
    tier: 'AGENCY',
    description: 'For agencies and large teams',
    price: 99,
    yearlyPrice: 990,
    creditsGiven: 500,
    features: [
      '500 image generations per month',
      'All premium features',
      '4K quality',
      'Dedicated support',
      'Custom branding',
      'Team collaboration',
      'Advanced analytics',
    ],
    isPopular: false,
    isActive: true,
    sortOrder: 2,
  },
];

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Plan.name) private readonly planModel: Model<PlanDocument>,
  ) {}

  async onModuleInit() {
    await this.seedPlansIfEmpty();
  }

  private async seedPlansIfEmpty() {
    const activeCount = await this.planModel.countDocuments({ isActive: true });
    if (activeCount === 0) {
      // Delete any old plans without proper structure
      await this.planModel.deleteMany({});
      await this.planModel.insertMany(DEFAULT_PLANS);
      console.log('Default subscription plans seeded successfully');
    } else {
      console.log(`Found ${activeCount} active subscription plans`);
    }
  }

  async getPlans(): Promise<PlanDocument[]> {
    return this.planModel.find({ isActive: true }).sort({ sortOrder: 1 }).exec();
  }

  async getPlanById(planId: string): Promise<PlanDocument | null> {
    return this.planModel.findById(planId).exec();
  }

  async getPlanByTier(tier: string): Promise<PlanDocument | null> {
    return this.planModel.findOne({ tier: tier.toUpperCase(), isActive: true }).exec();
  }

  async getCurrentSubscription(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const plan = await this.getPlanByTier(user.plan) || (await this.getPlans())[0];

    return {
      id: `sub_${user._id}`,
      planId: plan._id,
      planName: plan.name,
      planType: plan.tier,
      price: plan.price,
      billingPeriod: 'month' as const,
      status: 'active' as const,
      renewalDate: user.renewal_date?.toISOString() || null,
      creditsUsed: user.credits_used,
      creditsTotal: user.credits_total,
      createdAt: (user as any).createdAt?.toISOString(),
      updatedAt: (user as any).updatedAt?.toISOString(),
    };
  }

  async getDashboard(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const plans = await this.getPlans();
    const currentPlan = await this.getPlanByTier(user.plan) || plans[0];

    // Find the next upgrade plan
    const planIndex = plans.findIndex((p) => p.tier === currentPlan.tier);
    const upgradePlan = planIndex < plans.length - 1 ? plans[planIndex + 1] : null;

    return {
      plan: {
        name: currentPlan.name,
        tier: currentPlan.tier,
        price: currentPlan.price,
        status: 'active',
        renewsDate: user.renewal_date?.toISOString() || null,
      },
      usage: {
        balance: user.credits_total - user.credits_used,
        limit: user.credits_total,
        percentage: Math.round((user.credits_used / user.credits_total) * 100),
      },
      upgrade: upgradePlan
        ? {
            name: upgradePlan.name,
            tier: upgradePlan.tier,
            price: upgradePlan.price,
          }
        : null,
    };
  }

  async upgradePlan(
    userId: string,
    planId: string,
    billingPeriod: 'month' | 'year',
  ) {
    const plan = await this.getPlanById(planId);
    if (!plan) throw new BadRequestException('Invalid plan');

    const renewalDate = new Date();
    if (billingPeriod === 'year') {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    } else {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    }

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          plan: plan.tier,
          credits_total: plan.creditsGiven,
          credits_used: 0,
          renewal_date: renewalDate,
        },
      },
      { new: true },
    );

    if (!user) throw new BadRequestException('User not found');

    return this.getCurrentSubscription(userId);
  }

  async cancelSubscription(userId: string) {
    const freePlan = await this.getPlanByTier('FREE');
    if (!freePlan) throw new BadRequestException('Free plan not found');

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          plan: 'FREE',
          credits_total: freePlan.creditsGiven,
          renewal_date: null,
        },
      },
      { new: true },
    );

    if (!user) throw new BadRequestException('User not found');

    return this.getCurrentSubscription(userId);
  }
}
