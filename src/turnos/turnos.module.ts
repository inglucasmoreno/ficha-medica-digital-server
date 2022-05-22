import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { turnoSchema } from './schema/turno.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Turnos', schema: turnoSchema}])],
  providers: [TurnosService],
  controllers: [TurnosController]
})
export class TurnosModule {}
