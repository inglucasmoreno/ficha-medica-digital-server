import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicosExternosController } from './medicos-externos.controller';
import { MedicosExternosService } from './medicos-externos.service';
import { medicosExternosSchema } from './schema/medicos-externos.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'MedicosExternos', schema: medicosExternosSchema}])],
  controllers: [MedicosExternosController],
  providers: [MedicosExternosService]
})
export class MedicosExternosModule {}
