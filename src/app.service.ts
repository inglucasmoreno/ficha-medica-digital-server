import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Esto es un TEMPLATE de Equinoccio Technology';
  }
}
