import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersEmailExistsErrorFilter } from './users/filters/user-email-exists-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UsersEmailExistsErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
