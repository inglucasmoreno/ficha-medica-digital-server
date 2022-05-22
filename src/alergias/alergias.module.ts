import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlergiasController } from './alergias.controller';
import { AlergiasService } from './alergias.service';
import { alergiasSchema } from './schema/alergia.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Alergias', schema: alergiasSchema}])],
  controllers: [AlergiasController],
  providers: [AlergiasService]
})
export class AlergiasModule {}
