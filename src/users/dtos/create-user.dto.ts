import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty,IsString, MaxLength, MinLength} from "class-validator";

export class createUserDto {

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({ type: String, description: "email"})
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @ApiProperty({ type: String, description: "password"})
  password: string;
}