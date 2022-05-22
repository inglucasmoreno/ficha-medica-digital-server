import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose  from 'mongoose';
import { CirugiaDTO } from './dto/cirugia.dto';
import { ICirugia } from './interface/cirugia.interface';

@Injectable()
export class CirugiasService {
  constructor(@InjectModel('Cirugias') private readonly cirugiasModel: mongoose.Model<ICirugia>){}
  
  // Cirugias por ID
  async getCirugia(id: string): Promise<ICirugia> {

      const cirugiaDB = await this.cirugiasModel.findById(id);
      if(!cirugiaDB) throw new NotFoundException('La cirugia no existe');

      const pipeline = [];

      // Cirugia por ID
      const idCirugia = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idCirugia} }) 
  
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

      const cirugia = await this.cirugiasModel.aggregate(pipeline);
      
      return cirugia[0];

  } 

  // Listar cirugias por ficha
  async listarCirugiasPorFicha(id: string, querys: any): Promise<ICirugia[]> {
      
    const { columna, direccion } = querys;

    const pipeline = [];

    // Cirugia por ficha
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

    const cirugias = await this.cirugiasModel.aggregate(pipeline);
    
    return cirugias;

}  

// Listar cirugias
async listarCirugias(querys: any): Promise<ICirugia[]> {
      
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

    const cirugias = await this.cirugiasModel.aggregate(pipeline);
    
    return cirugias;

  }  

  // Crear cirugia
  async crearCirugia(cirugiaDTO: CirugiaDTO): Promise<ICirugia> {
      const nuevaCirugia = new this.cirugiasModel(cirugiaDTO);
      return await nuevaCirugia.save();
  }

  // Actualizar cirugia
  async actualizarCirugia(id: string, cirugiaUpdateDTO: any): Promise<ICirugia> {
      const cirugia = await this.cirugiasModel.findByIdAndUpdate(id, cirugiaUpdateDTO, {new: true});
      return cirugia;
  }

}
