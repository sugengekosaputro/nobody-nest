import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/global-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Preload environment variables before NestJS starts
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);
  // const [app_port, app_name, app_env] = await Promise.all([
  //   configService.get<number>('APP_PORT'),
  //   configService.get<string>('APP_NAME'),
  //   configService.get<string>('APP_ENVIRONMENT'),
  // ]);

  // const logger = new Logger();
  // Logger.overrideLogger(
  //   app_env === 'development'
  //     ? ['log', 'error', 'warn', 'debug', 'verbose']
  //     : ['log', 'error', 'warn'],
  // );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
  // logger.log(`${app_name} (${app_env}) running on port ${app_port}`);
}

bootstrap();
