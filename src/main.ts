import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // app.enableCors(); // Enable CORS if needed
  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
