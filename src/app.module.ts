import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from './reports/reports.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/usersDB'),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['SessionSecretKey'],
        }),
      )
      .forRoutes('*');
  }
}
