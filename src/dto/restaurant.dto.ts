import { Type } from "class-transformer";
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export type RestaurantColumn = keyof RestaurantDto;

//DTO Restaurant
export class RestaurantDto {
  @IsNotEmpty({ message: 'Id is mandatory' })
  @IsString({ message: 'Id must be a String' })
  id: string;
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'Rating must be greather or equals to 0' })
  @Max(4, { message: 'Rating must be lesser or equals to 4' })
  rating?: number | null;
  @IsNotEmpty({ message: 'Name is mandatory' })
  @IsString({ message: 'Name must be a String' })
  name: string;
  site?: string | null;
  @IsOptional()
  @IsEmail()
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  @IsNotEmpty({ message: 'Lat is mandatory' })
  @IsLatitude()
  lat: number;
  @IsNotEmpty({ message: 'Lng is mandatory' })
  @IsLongitude()
  lng: number;
}

//DTO Restaurant
export class RestaurantOptionalDto {
  @IsNotEmpty({ message: 'Id is mandatory' })
  @IsString({ message: 'Id must be a String' })
  id: string;
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'Rating must be greather or equals to 0' })
  @Max(4, { message: 'Rating must be lesser or equals to 4' })
  rating?: number | null;
  @IsOptional()
  @IsNotEmpty({ message: 'Name is mandatory' })
  @IsString({ message: 'Name must be a String' })
  name: string;
  @IsOptional()
  site?: string | null;
  @IsOptional()
  @IsEmail()
  email?: string | null;
  @IsOptional()
  phone?: string | null;
  @IsOptional()
  city?: string | null;
  @IsOptional()
  state?: string | null;
  @IsOptional()
  @IsNotEmpty({ message: 'Lat is mandatory' })
  @IsLatitude()
  lat: number;
  @IsOptional()
  @IsNotEmpty({ message: 'Lng is mandatory' })
  @IsLongitude()
  lng: number;
}