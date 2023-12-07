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
    MongooseModule.forRoot(process.env.MONGO_URL),
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
