import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async index() {
    return { status: 'ok' };
  }
}
