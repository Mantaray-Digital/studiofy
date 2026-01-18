import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GcsService } from 'src/gcs/gcs.service';
import { ProjectsService } from '../projects/projects.service';
import { StylesService } from '../styles/styles.service';
import { UsersService } from '../users/users.service';
import { GenerateDto } from './dto/generate.dto';

// Cost configuration
const GOOGLE_COST_PER_IMAGE = 0.04; // Example cost per image generation
const MARGIN_MULTIPLIER = 3;

@Injectable()
export class GenerationService {
  constructor(
    private readonly config: ConfigService,
    private readonly gcsService: GcsService,
    private readonly projectsService: ProjectsService,
    private readonly stylesService: StylesService,
    private readonly usersService: UsersService,
  ) {}

  async generateAssets(
    userId: string,
    image: Express.Multer.File,
    dto: GenerateDto,
  ) {
    // Get user and check credits
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const creditsNeeded = dto.quantity || 1;
    const availableCredits = user.credits_total - user.credits_used;
    if (availableCredits < creditsNeeded) {
      throw new BadRequestException('Insufficient credits');
    }

    // Get style if provided
    let stylePrompt = '';
    if (dto.styleId) {
      const style = await this.stylesService.findById(dto.styleId);
      if (style) {
        stylePrompt = style.promptTemplate;
      }
    }

    // Upload the source image
    const uploadedSource = await this.gcsService.uploadPublicFile(image);

    // TODO: Integrate with actual AI image generation service (e.g., Google Imagen, DALL-E, etc.)
    // For now, we'll simulate the generation by using the uploaded image
    // In production, you would call the AI service here

    const quantity = dto.quantity || 1;
    const generatedImages: string[] = [];
    const timestamp = Date.now();

    // Simulate generated images (in production, this would be actual AI-generated images)
    for (let i = 0; i < quantity; i++) {
      // For demo purposes, we use the source image as the "generated" result
      // Replace this with actual AI generation in production
      generatedImages.push(uploadedSource.url);
    }

    // Use first generated image as thumbnail
    const thumbnailUrl = generatedImages[0];

    // Calculate costs
    const googleCostUsd = GOOGLE_COST_PER_IMAGE * quantity;
    const userPriceUsd = googleCostUsd * MARGIN_MULTIPLIER;
    const profitUsd = userPriceUsd - googleCostUsd;

    // Create project with generated assets
    const project = await this.projectsService.create(userId, {
      name: dto.prompt,
      thumbnailUrl,
      outputs: {
        images: generatedImages,
        caption: '',
      },
      meta: {
        productContext: dto.prompt,
        styleProfile: stylePrompt || 'Default style',
        quantity,
      },
      metadata: {
        tokensIn: 512, // Placeholder - would come from AI service
        tokensOut: 0,
        imageCount: quantity,
        googleCostUsd,
        userPriceUsd,
        profitUsd,
        margin: MARGIN_MULTIPLIER,
      },
    });

    // Deduct credits from user
    await this.usersService.updateCredits(userId, creditsNeeded);

    return project;
  }
}
