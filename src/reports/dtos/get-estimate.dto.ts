import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))         // to transform QueryString for incoming Request To Integer 
  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  long: number;             //longitude

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;              //latitude

 @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}