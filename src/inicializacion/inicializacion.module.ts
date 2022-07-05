import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InicializacionController } from './inicializacion.controller';
import { InicializacionService } from './inicializacion.service';
import { usuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { tipoMedicoSchema } from 'src/tipo-medico/schema/tipo-medico.schema';
import { fichaSchema } from 'src/fichas/schema/fichas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Usuario', schema: usuarioSchema}, 
      {name: 'TipoMedico', schema: tipoMedicoSchema},
      {name: 'Ficha', schema: fichaSchema}
    ]),
  ],
  controllers: [InicializacionController],
  providers: [InicializacionService]
})
export class InicializacionModule {}
