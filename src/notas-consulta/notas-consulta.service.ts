import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotasConsulta } from './interface/notas-consulta.interface';
import * as mongoose  from 'mongoose';
import { NotasConsultaDTO } from './dto/notas-consulta.dto';

@Injectable()
export class NotasConsultaService {

  constructor(@InjectModel('Notas-Consulta') private readonly notasConsultaModel: Model<INotasConsulta>){}
  
  // Notas de consulta por ID
  async getNota(id: string): Promise<INotasConsulta> {

      const notaDB = await this.notasConsultaModel.findById(id);
      if(!notaDB) throw new NotFoundException('La nota no existe');

      const pipeline = [];

      // Nota por ID
      const idNota = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idNota} }) 
  
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

      const nota = await this.notasConsultaModel.aggregate(pipeline);
      
      return nota[0];

  } 

  // Listar notas por ficha
  async listarNotasPorFicha(id: string, querys: any): Promise<INotasConsulta[]> {
      
    const { columna, direccion } = querys;

    const pipeline = [];

    // Nota por ID
    const idFicha = new mongoose.Types.ObjectId(id);
    pipeline.push({$match:{ ficha: idFicha }});

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

    const notas = await this.notasConsultaModel.aggregate(pipeline);
    
    return notas;

}  

// Listar notas 
async listarNotas(querys: any): Promise<INotasConsulta[]> {
      
    const {columna, direccion} = querys;

    const pipeline = [];
    pipeline.push({$match:{}});

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

    const notas = await this.notasConsultaModel.aggregate(pipeline);
    
    return notas;

  }  

  // Crear nota
  async crearNota(notaDTO: NotasConsultaDTO): Promise<INotasConsulta> {
      const nuevaNota = new this.notasConsultaModel(notaDTO);
      return await nuevaNota.save();
  }

  // Actualizar nota
  async actualizarNota(id: string, notaUpdateDTO: any): Promise<INotasConsulta> {
      const nota = await this.notasConsultaModel.findByIdAndUpdate(id, notaUpdateDTO, {new: true});
      return nota;
  }

}
