import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tipoMedicoSchema } from './schema/tipo-medico.schema';
import { TipoMedicoController } from './tipo-medico.controller';
import { TipoMedicoService } from './tipo-medico.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'TipoMedico', schema: tipoMedicoSchema}])],
  controllers: [TipoMedicoController],
  providers: [TipoMedicoService]
})
export class TipoMedicoModule {}
