import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5002;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`app running on port: ${port}`);
  });
}
bootstrap();
