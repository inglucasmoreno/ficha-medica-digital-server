import { Module } from '@nestjs/common';
import { AutorizacionesMedicamentosService } from './autorizaciones-medicamentos.service';
import { AutorizacionesMedicamentosController } from './autorizaciones-medicamentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { autorizacionesMedicamentosSchema } from './schema/autorizaciones-medicamentos.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'AutorizacionesMedicamentos', schema: autorizacionesMedicamentosSchema}])],
  providers: [AutorizacionesMedicamentosService],
  controllers: [AutorizacionesMedicamentosController]
})
export class AutorizacionesMedicamentosModule {}
