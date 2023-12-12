import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('Tarek-Mongoose-API')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  const config = new DocumentBuilder()
  .setTitle('Car Vehicles Estimate Value Project')
  .setDescription('The CarV API Description')
  .setVersion('1.0')
  .addTag('CarV')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


await app.listen(5000);
console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();