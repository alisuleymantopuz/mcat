import {
    TerminusEndpoint,
    TerminusOptionsFactory,
    DNSHealthIndicator,
    TerminusModuleOptions
  } from '@nestjs/terminus';

  import { Injectable } from '@nestjs/common';
  
  @Injectable()
  export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
      private readonly dns: DNSHealthIndicator,
    ) {}
  
    createTerminusOptions(): TerminusModuleOptions {
      const healthEndpoint: TerminusEndpoint = {
        url: '/health',
        healthIndicators: [
          async () => this.dns.pingCheck('genres', 'http://localhost:3000/genres')
        ],
      };
      return {
        endpoints: [healthEndpoint],
      };
    }
  }