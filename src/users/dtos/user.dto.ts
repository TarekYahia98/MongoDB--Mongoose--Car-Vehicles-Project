import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
 
  @Expose()
  email: string;

  @Expose()
  admin: Boolean;
}
