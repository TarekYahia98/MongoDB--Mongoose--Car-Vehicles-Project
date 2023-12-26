import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class tokensDto {

  @Expose()
  @ApiProperty({ type: String, description: "accessToken"})
  accessToken: String;

  @Expose()
  @ApiProperty({ type: String, description: "refreshToken"})
  refreshToken: String;
}
