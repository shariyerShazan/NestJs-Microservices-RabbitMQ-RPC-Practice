import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'media';
  const logger = new Logger('mediaBootsratp');

  const rmqUrl = process.env.RABBITMQ_URL! ?? 'amqp://localhost:5672';
  const queue = process.env.MEDIA_QUEUE!;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
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

  logger.log(`Media RNQ running on queue ${queue} via ${rmqUrl}`);
}
bootstrap();
