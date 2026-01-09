import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'catalog';
  const logger = new Logger('catalogBootstrap');

  const rmqUrl = process.env.RABBITMQ_URL! ?? 'amqp://localhost:5672';
  const queue = process.env.CATALOG_QUEUE!;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Catalog RNQ running on queue ${queue} via ${rmqUrl}`);
}
bootstrap();
