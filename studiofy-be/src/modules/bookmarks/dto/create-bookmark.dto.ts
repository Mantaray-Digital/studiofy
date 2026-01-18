import { IsString, IsNotEmpty, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class CreateBookmarkDto {
  @IsMongoId()
  @IsNotEmpty()
  projectId: string;

  @IsEnum(['image', 'text'])
  @IsNotEmpty()
  type: 'image' | 'text';

  @IsString()
  @IsNotEmpty()
  content: string;
}