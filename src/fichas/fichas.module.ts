import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FichasController } from './fichas.controller';
import { FichasService } from './fichas.service';
import { fichaSchema } from './schema/fichas.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Ficha', schema: fichaSchema}])],
  controllers: [FichasController],
  providers: [FichasService]
})
export class FichasModule {}
