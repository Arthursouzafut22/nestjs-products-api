import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersEmailExistsErrorFilter } from './users/filters/user-email-exists-filter';
import { ValidationPipe } from '@nestjs/common';
import { PasswordsAreNotEqualFilter } from './auth/filters/passwords-are-not-equal-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UsersEmailExistsErrorFilter(), new PasswordsAreNotEqualFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
