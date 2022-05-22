import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose  from 'mongoose';
import { Model } from 'mongoose';
import { EstudioDTO } from './dto/estudio.dto';
import { IEstudio } from './interface/estudio.interface';

@Injectable()
export class EstudiosService {
  constructor(@InjectModel('Estudios') private readonly estudiosModel: Model<IEstudio>){}
  
  // Estudio por ID
  async getEstudio(id: string): Promise<IEstudio> {

      const estudioDB = await this.estudiosModel.findById(id);
      if(!estudioDB) throw new NotFoundException('El estudio no existe');

      const pipeline = [];

      // Estudio por ID
      const idEstudio = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idEstudio} }) 
  
      // Informacion de ficha
      pipeline.push({
        $lookup: { // Lookup
            from: 'fichas',
            localField: 'ficha',
            foreignField: '_id',
            as: 'ficha'
        }}
      );

      pipeline.push({ $unwind: '$ficha' });

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'updatorUser',
            foreignField: '_id',
            as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      const estudio = await this.estudiosModel.aggregate(pipeline);
      
      return estudio[0];

  } 

  // Listar estudios por ficha
  async listarEstudiosPorFicha(id: string, querys: any): Promise<IEstudio[]> {
      
    const { columna, direccion } = querys;

    const pipeline = [];

    const idFicha = new mongoose.Types.ObjectId(id);
    pipeline.push({$match:{ ficha: idFicha }});

    // Informacion de usuario creador
    pipeline.push({
      $lookup: { // Lookup
          from: 'fichas',
          localField: 'ficha',
          foreignField: '_id',
          as: 'ficha'
      }}
    );

    pipeline.push({ $unwind: '$ficha' });

    // Informacion de usuario creador
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'creatorUser',
          foreignField: '_id',
          as: 'creatorUser'
      }}
    );

    pipeline.push({ $unwind: '$creatorUser' });

    // Informacion de usuario actualizador
    pipeline.push({
      $lookup: { // Lookup
        from: 'usuarios',
        localField: 'updatorUser',
        foreignField: '_id',
        as: 'updatorUser'
      }}
    );

    pipeline.push({ $unwind: '$updatorUser' });

    // Ordenando datos
    const ordenar: any = {};
    if(columna){
        ordenar[String(columna)] = Number(direccion);
        pipeline.push({$sort: ordenar});
    }      

    const estudios = await this.estudiosModel.aggregate(pipeline);
    
    return estudios;

}  

// Listar estudios
async listarEstudios(querys: any): Promise<IEstudio[]> {
      
    const {columna, direccion} = querys;

    const pipeline = [];
    pipeline.push({$match:{}});

    // Informacion de ficha
    pipeline.push({
      $lookup: { // Lookup
          from: 'fichas',
          localField: 'ficha',
          foreignField: '_id',
          as: 'ficha'
      }}
    );

    pipeline.push({ $unwind: '$ficha' });

    // Informacion de usuario creador
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'creatorUser',
          foreignField: '_id',
          as: 'creatorUser'
      }}
    );

    pipeline.push({ $unwind: '$creatorUser' });

    // Informacion de usuario actualizador
    pipeline.push({
      $lookup: { // Lookup
        from: 'usuarios',
        localField: 'updatorUser',
        foreignField: '_id',
        as: 'updatorUser'
      }}
    );

    pipeline.push({ $unwind: '$updatorUser' });

    // Ordenando datos
    const ordenar: any = {};
    if(columna){
        ordenar[String(columna)] = Number(direccion);
        pipeline.push({$sort: ordenar});
    }      

    const estudios = await this.estudiosModel.aggregate(pipeline);
    
    return estudios;

  }  

  // Crear estudio
  async crearEstudio(estudioDTO: EstudioDTO): Promise<IEstudio> {
      const nuevoEstudio = new this.estudiosModel(estudioDTO);
      return await nuevoEstudio.save();
  }

  // Actualizar estudio
  async actualizarEstudio(id: string, estudioUpdateDTO: any): Promise<IEstudio> {
      const estudio = await this.estudiosModel.findByIdAndUpdate(id, estudioUpdateDTO, {new: true});
      return estudio;
  }
}
