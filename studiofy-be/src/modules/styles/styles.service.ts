import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Style, StyleDocument } from './entities/style.entity';

// Default styles for seeding the database
const DEFAULT_STYLES = [
  {
    name: 'Professional',
    promptTemplate: 'professional product photography, clean white background, soft studio lighting, commercial style, high-end product shot, sharp focus, 8k quality',
    thumbnailUrl: '/images/styles/professional.jpg',
    isPremium: false,
    isActive: true,
    sortOrder: 0,
  },
  {
    name: 'Classy',
    promptTemplate: 'elegant luxury product shot, sophisticated minimalist setting, warm ambient lighting, premium feel, refined atmosphere, high contrast, 8k quality',
    thumbnailUrl: '/images/styles/classy.jpg',
    isPremium: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'Solid',
    promptTemplate: 'product photography with solid color background, bold vibrant colors, clean modern aesthetic, strong contrast, studio lighting, 8k quality',
    thumbnailUrl: '/images/styles/solid.jpg',
    isPremium: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'Lifestyle',
    promptTemplate: 'lifestyle product photography, natural setting, candid dynamic composition, warm natural lighting, authentic atmosphere, storytelling, 8k quality',
    thumbnailUrl: '/images/styles/lifestyle.jpg',
    isPremium: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'Luxury Dark Marble',
    promptTemplate: 'luxury product shot, dark black marble surface with gold veins, dramatic cinematic lighting, elegant atmosphere, high contrast, reflection, 8k, premium feel',
    thumbnailUrl: '/images/styles/luxury-dark-marble.jpg',
    isPremium: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'Neon Glow',
    promptTemplate: 'cyberpunk product photography, neon lighting, futuristic setting, vibrant pink and blue glow, dark background, reflective surface, high-tech aesthetic, 8k quality',
    thumbnailUrl: '/images/styles/neon-glow.jpg',
    isPremium: true,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'Nature Fresh',
    promptTemplate: 'product photography in natural setting, fresh green leaves and plants, outdoor lighting, organic feel, eco-friendly atmosphere, soft bokeh background, 8k quality',
    thumbnailUrl: '/images/styles/nature-fresh.jpg',
    isPremium: true,
    isActive: true,
    sortOrder: 6,
  },
  {
    name: 'Minimalist White',
    promptTemplate: 'minimalist product photography, pure white background, soft shadows, clean aesthetic, Scandinavian style, airy feel, natural lighting, 8k quality',
    thumbnailUrl: '/images/styles/minimalist-white.jpg',
    isPremium: false,
    isActive: true,
    sortOrder: 7,
  },
];

@Injectable()
export class StylesService implements OnModuleInit {
  constructor(
    @InjectModel(Style.name) private readonly styleModel: Model<StyleDocument>,
  ) {}

  async onModuleInit() {
    await this.seedStylesIfEmpty();
  }

  private async seedStylesIfEmpty() {
    // Check if styles need updating (e.g., missing thumbnailUrl)
    const stylesWithoutThumbnails = await this.styleModel.countDocuments({
      isActive: true,
      $or: [{ thumbnailUrl: '' }, { thumbnailUrl: { $exists: false } }],
    });

    if (stylesWithoutThumbnails > 0) {
      // Re-seed with updated data
      await this.styleModel.deleteMany({});
      await this.styleModel.insertMany(DEFAULT_STYLES);
      console.log('Styles re-seeded with thumbnail URLs');
      return;
    }

    const activeCount = await this.styleModel.countDocuments({ isActive: true });
    if (activeCount === 0) {
      await this.styleModel.deleteMany({});
      await this.styleModel.insertMany(DEFAULT_STYLES);
      console.log('Default styles seeded successfully');
    } else {
      console.log(`Found ${activeCount} active styles`);
    }
  }

  async findAll(): Promise<StyleDocument[]> {
    return this.styleModel.find({ isActive: true }).sort({ sortOrder: 1 }).exec();
  }

  async findById(id: string): Promise<StyleDocument | null> {
    return this.styleModel.findById(id).exec();
  }

  async findByName(name: string): Promise<StyleDocument | null> {
    return this.styleModel.findOne({ name, isActive: true }).exec();
  }

  async getFreeStyles(): Promise<StyleDocument[]> {
    return this.styleModel
      .find({ isActive: true, isPremium: false })
      .sort({ sortOrder: 1 })
      .exec();
  }

  async getPremiumStyles(): Promise<StyleDocument[]> {
    return this.styleModel
      .find({ isActive: true, isPremium: true })
      .sort({ sortOrder: 1 })
      .exec();
  }
}
