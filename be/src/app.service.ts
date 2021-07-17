import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion() {
    return {
      message: 'Welcome :)',
      data: {
        version: 'lunch-map api v1.0',
      },
    };
  }
}
