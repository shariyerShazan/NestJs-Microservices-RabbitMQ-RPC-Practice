import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'gateway';
  const logger = new Logger('GatewayBootstrap');
  const port = Number(process.env.GATEWAY_PORT! ?? 11111);
  const app = await NestFactory.create(GatewayModule);
  await app.listen(port);

  app.enableShutdownHooks();
  logger.log(`Gateway it runnig at http://localhost:${port}`);
}
bootstrap();
