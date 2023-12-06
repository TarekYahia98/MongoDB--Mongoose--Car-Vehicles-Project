import { Expose } from 'class-transformer';

export class tokensDto {

  @Expose()
  accessToken: String;

  @Expose()
  refreshToken: String;
}
