import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.GATEWAY_PORT);
}
bootstrap().then(() => {
  console.log(`Gateway App started on port: ${process.env.GATEWAY_PORT}`);
});
