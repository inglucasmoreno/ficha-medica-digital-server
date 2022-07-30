import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InicializacionController } from './inicializacion.controller';
import { InicializacionService } from './inicializacion.service';
import { usuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { tipoMedicoSchema } from 'src/tipo-medico/schema/tipo-medico.schema';
import { fichaSchema } from 'src/fichas/schema/fichas.schema';
import { medicosExternosSchema } from 'src/medicos-externos/schema/medicos-externos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Usuario', schema: usuarioSchema}, 
      {name: 'TipoMedico', schema: tipoMedicoSchema},
      {name: 'Ficha', schema: fichaSchema},
      {name: 'MedicosExternos', schema: medicosExternosSchema},
    ]),
  ],
  controllers: [InicializacionController],
  providers: [InicializacionService]
})
export class InicializacionModule {}
