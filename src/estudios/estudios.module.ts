import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudiosController } from './estudios.controller';
import { EstudiosService } from './estudios.service';
import { estudioSchema } from './schema/estudio.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Estudios', schema: estudioSchema}])],
  controllers: [EstudiosController],
  providers: [EstudiosService]
})
export class EstudiosModule {}
