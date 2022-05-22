import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAlergia } from './interface/alergia.interface';
import * as mongoose  from 'mongoose';
import { AlergiaDTO } from './dto/alergias.dto';

@Injectable()
export class AlergiasService {
  constructor(@InjectModel('Alergias') private readonly alergiasModel: Model<IAlergia>){}
  
  // Alergia por ID
  async getAlergia(id: string): Promise<IAlergia> {

      const alergiaDB = await this.alergiasModel.findById(id);
      if(!alergiaDB) throw new NotFoundException('La alergia no existe');

      const pipeline = [];

      // Alergia por ID
      const idAlergia = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idAlergia} }) 
  
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

      const alergia = await this.alergiasModel.aggregate(pipeline);
      
      return alergia[0];

  } 

  // Listar alergias por ficha
  async listarAlergiasPorFicha(id: string, querys: any): Promise<IAlergia[]> {
      
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

    const alergias = await this.alergiasModel.aggregate(pipeline);
    
    return alergias;

}  

// Listar alergias
async listarAlergias(querys: any): Promise<IAlergia[]> {
      
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

    const alergias = await this.alergiasModel.aggregate(pipeline);
    
    return alergias;

  }  

  // Crear alergia
  async crearAlergia(alergiaDTO: AlergiaDTO): Promise<IAlergia> {
      const nuevaAlergia = new this.alergiasModel(alergiaDTO);
      return await nuevaAlergia.save();
  }

  // Actualizar alergia
  async actualizarAlergia(id: string, alergiaUpdateDTO: any): Promise<IAlergia> {
      const alergia = await this.alergiasModel.findByIdAndUpdate(id, alergiaUpdateDTO, {new: true});
      return alergia;
  }

}
