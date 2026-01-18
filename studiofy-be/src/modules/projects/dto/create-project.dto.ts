import { IsString, IsOptional, IsArray, IsNumber, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectOutputsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  caption?: string;
}

export class ProjectMetaDto {
  @IsString()
  @IsOptional()
  productContext?: string;

  @IsString()
  @IsOptional()
  styleProfile?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  quantity?: number;
}

export class ProjectMetadataDto {
  @IsNumber()
  @IsOptional()
  tokensIn?: number;

  @IsNumber()
  @IsOptional()
  tokensOut?: number;

  @IsNumber()
  @IsOptional()
  imageCount?: number;

  @IsNumber()
  @IsOptional()
  googleCostUsd?: number;

  @IsNumber()
  @IsOptional()
  userPriceUsd?: number;

  @IsNumber()
  @IsOptional()
  profitUsd?: number;

  @IsNumber()
  @IsOptional()
  margin?: number;
}

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ValidateNested()
  @Type(() => ProjectOutputsDto)
  @IsOptional()
  outputs?: ProjectOutputsDto;

  @ValidateNested()
  @Type(() => ProjectMetaDto)
  @IsOptional()
  meta?: ProjectMetaDto;

  @ValidateNested()
  @Type(() => ProjectMetadataDto)
  @IsOptional()
  metadata?: ProjectMetadataDto;
}
