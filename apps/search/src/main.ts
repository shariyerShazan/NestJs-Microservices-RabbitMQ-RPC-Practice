import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'search';
  const port = Number(process.env.SEARCH_TCP_PORT! ?? 44444);
  const logger = new Logger('searchBootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      options: {
        host: '0.0.0.0',
        port,
      },
      transport: Transport.TCP,
    },
  );
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Search service is runnnig at http://localhost:${port}`);
}
bootstrap();
