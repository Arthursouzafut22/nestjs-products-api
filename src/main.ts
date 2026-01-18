import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersEmailExistsErrorFilter } from './users/filters/user-email-exists-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UsersEmailExistsErrorFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
