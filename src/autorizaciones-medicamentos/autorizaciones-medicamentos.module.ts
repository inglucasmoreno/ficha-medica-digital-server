import { Module } from '@nestjs/common';
import { AutorizacionesMedicamentosService } from './autorizaciones-medicamentos.service';
import { AutorizacionesMedicamentosController } from './autorizaciones-medicamentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { autorizacionesMedicamentosSchema } from './schema/autorizaciones-medicamentos.schema';
import { medicosExternosSchema } from 'src/medicos-externos/schema/medicos-externos.schema';
import { usuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { medicamentosSchema } from 'src/medicamentos/schema/medicamentos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'AutorizacionesMedicamentos', schema: autorizacionesMedicamentosSchema}]),
    MongooseModule.forFeature([{name: 'MedicosExternos', schema: medicosExternosSchema}]),
    MongooseModule.forFeature([{name: 'Usuarios', schema: usuarioSchema}]),
    MongooseModule.forFeature([{name: 'Medicamentos', schema: medicamentosSchema}]),
  ],
  providers: [AutorizacionesMedicamentosService],
  controllers: [AutorizacionesMedicamentosController]
})
export class AutorizacionesMedicamentosModule {}
