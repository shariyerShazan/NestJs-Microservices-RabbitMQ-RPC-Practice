import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'catalog';
  const logger = new Logger('catalogBootstrap');
  const port = Number(process.env.CATALOG_TCP_PORT! ?? 22222);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Catalog is running at http://localhost:${port}`);
}
bootstrap();
