import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtStrategy } from './strategies/jwt-strategy';
import { CurrentUserMiddleWare } from './middlewares/current-user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '300s' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: true,
        auth: {
          user: 'eng.tarek.yahiia@gmail.com', //generated ethereal user From My Account
          pass: 'digs gzhn edps tvxi', //generated ethereal password From Gmail (Auto-generated) To Send Emails
        },
      },
    }),
  ],
  providers: [UsersService, AuthService, RefreshJwtStrategy, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleWare).forRoutes('*');
  }
}
