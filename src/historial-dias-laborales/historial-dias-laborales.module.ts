import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialDiasLaboralesController } from './historial-dias-laborales.controller';
import { HistorialDiasLaboralesService } from './historial-dias-laborales.service';
import { historialDiasLaboralesSchema } from './schema/historial-dias-laborales.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Historial-Dias-Laborales', schema: historialDiasLaboralesSchema}])],
  controllers: [HistorialDiasLaboralesController],
  providers: [HistorialDiasLaboralesService]
})
export class HistorialDiasLaboralesModule {}
