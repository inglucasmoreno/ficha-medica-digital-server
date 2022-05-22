import { Module } from '@nestjs/common';
import { CirugiasService } from './cirugias.service';
import { CirugiasController } from './cirugias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cirugiasSchema } from './schema/cirugia.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cirugias', schema: cirugiasSchema}])],
  providers: [CirugiasService],
  controllers: [CirugiasController]
})
export class CirugiasModule {}
