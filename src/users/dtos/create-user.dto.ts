import { IsEmail,IsNotEmpty,IsString, MaxLength, MinLength} from "class-validator";

export class createUserDto {

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;
}