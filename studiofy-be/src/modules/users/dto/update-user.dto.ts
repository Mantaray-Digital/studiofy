import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
export class LocationDto {
  @IsString()
  @IsEnum(['Point'])
  type: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number]; // [longitude, latitude]
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  profilePic?: string | undefined;

  @IsOptional()
  address?: {
    street: string;
    building: string;
    city: string;
    floor: string;
    apartment: string;
    country: string;
  };
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new Error('Invalid location format. Expected a valid JSON string.');
      }
    }
    return value; // Return as is if already an object
  })
  location?: LocationDto;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
