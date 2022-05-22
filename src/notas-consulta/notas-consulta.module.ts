import { Module } from '@nestjs/common';
import { NotasConsultaService } from './notas-consulta.service';
import { NotasConsultaController } from './notas-consulta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { notasConsultaSchema } from './schema/notas-consulta.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Notas-Consulta', schema: notasConsultaSchema}])],
  providers: [NotasConsultaService],
  controllers: [NotasConsultaController]
})
export class NotasConsultaModule {}
