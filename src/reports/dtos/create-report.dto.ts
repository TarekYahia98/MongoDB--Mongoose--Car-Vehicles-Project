import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({ type: Number, description: "price"})
  price: number;

  @IsString()
  @ApiProperty({ type: String, description: "make"})
  make: string;

  @IsString()
  @ApiProperty({ type: String, description: "model"})
  model: string;

  @IsNumber()
  @Min(1950)
  @Max(2050)
  @ApiProperty({ type: Number, description: "year"})
  year: number;

 
  @IsLongitude()
  @ApiProperty({ type: Number, description: "longitude"})
  long: number;             //longitude

  
  @IsLatitude()
  @ApiProperty({ type: Number, description: "latitude"})
  lat: number;              //latitude

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({ type: Number, description: "mileage"})
  mileage: number;
}