import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GenerateDto {
  @IsString()
  prompt: string;

  @IsString()
  @IsOptional()
  styleId?: string;

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 1;
    }
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsInt()
  @Min(1)
  @Max(4)
  quantity: number = 1;
}
