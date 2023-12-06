import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

 
  @IsLongitude()
  long: number;             //longitude

  
  @IsLatitude()
  lat: number;              //latitude

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}