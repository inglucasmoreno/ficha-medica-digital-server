import { Module } from '@nestjs/common';
import { AntecedentesService } from './antecedentes.service';
import { AntecedentesController } from './antecedentes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { antecedenteSchema } from './schema/antecedente.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Antecedentes', schema: antecedenteSchema}])],
  providers: [AntecedentesService],
  controllers: [AntecedentesController]
})
export class AntecedentesModule {}
