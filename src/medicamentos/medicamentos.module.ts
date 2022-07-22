import { Module } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { medicamentosSchema } from './schema/medicamentos.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Medicamentos', schema: medicamentosSchema}])],
  providers: [MedicamentosService],
  controllers: [MedicamentosController]
})
export class MedicamentosModule {}
