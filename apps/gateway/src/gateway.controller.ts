/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
    @Inject('MEDIA_SERVICE') private readonly mediaClient: ClientProxy,
    @Inject('SEARCH_SERVICE') private readonly searchClient: ClientProxy,
  ) {}

  @Get('health')
  // eslint-disable-next-line @typescript-eslint/require-await
  async health() {
    const ping = async (serviceName: string, client: ClientProxy) => {
      try {
        const result = await firstValueFrom(
          client.send('service.ping', { from: 'gateway' }),
        );

        return {
          ok: true,
          service: serviceName,
          result,
        };
      } catch (error: any) {
        return {
          ok: false,
          service: serviceName,
          error: error?.message ?? 'Unknown Error',
        };
      }
    };

    const [catalog, media, search] = await Promise.all([
      ping('catalog', this.catalogClient),
      ping('media', this.mediaClient),
      ping('search', this.searchClient),
    ]);

    const ok = [catalog, media, search].every((service) => service.ok);

    return {
      ok,
      gateway: {
        service: 'gateway',
        time: new Date().toISOString(),
      },
      service: {
        catalog,
        media,
        search,
      },
    };
  }
}
