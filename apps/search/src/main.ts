import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'search';

  const rmqUrl = process.env.RABBITMQ_URL! ?? 'amqp://localhost:5672';
  const queue = process.env.SEARCH_QUEUE!;

  const logger = new Logger('searchBootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
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
  logger.log(`Search RNQ running on queue ${queue} via ${rmqUrl}`);
}
bootstrap();
