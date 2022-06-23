import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { IHistorialDiasLaborales } from './interface/historial-dias-laborales.interface';
import { HistorialDiasLaboralesDTO } from './dto/historial-dias-laborales.dto';

@Injectable()
export class HistorialDiasLaboralesService {

  constructor(@InjectModel('Historial-Dias-Laborales') private readonly historialDiasLaboralesModel: Model<IHistorialDiasLaborales>){}
  
  // Historial por ID
  async getHistorial(id: string): Promise<IHistorialDiasLaborales> {

      const historialDB = await this.historialDiasLaboralesModel.findById(id);
      if(!historialDB) throw new NotFoundException('El elemento no existe');

      const pipeline = [];

      // Historial por ID
      const idHistorial = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idHistorial} }) 
  
      // Informacion de usuario
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'usuario',
            foreignField: '_id',
            as: 'usuario'
        }}
      );

      pipeline.push({ $unwind: '$usuario' });

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

      const historial = await this.historialDiasLaboralesModel.aggregate(pipeline);
      
      return historial[0];

  } 

  // Listar historiales por usuario 
  async listarHistorialPorUsuario(id: string, querys: any): Promise<IHistorialDiasLaborales[]> {
      
    const { columna, direccion } = querys;

    const pipeline = [];

    // Historial por usuario
    const idUsuario = new mongoose.Types.ObjectId(id);
    pipeline.push({$match:{ usuario: idUsuario }});

    // Informacion de usuario
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'usuario',
          foreignField: '_id',
          as: 'usuario'
      }}
    );

    pipeline.push({ $unwind: '$usuario' });

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

    const historial = await this.historialDiasLaboralesModel.aggregate(pipeline);
    
    return historial;

}  

// Listar historiales 
async listarHistoriales(querys: any): Promise<IHistorialDiasLaborales[]> {
      
    const {columna, direccion} = querys;

    const pipeline = [];
    pipeline.push({$match:{}});

    // Informacion de usuario
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'usuario',
          foreignField: '_id',
          as: 'usuario'
      }}
    );

    pipeline.push({ $unwind: '$usuario' });

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

    const historial = await this.historialDiasLaboralesModel.aggregate(pipeline);
    
    return historial;

  }  

  // Crear historial
  async crearHistorial(historialDTO: HistorialDiasLaboralesDTO): Promise<IHistorialDiasLaborales> {
      const nuevoHistorial = new this.historialDiasLaboralesModel(historialDTO);
      return await nuevoHistorial.save();
  }

  // Actualizar historial
  async actualizarHistorial(id: string, historialUpdateDTO: any): Promise<IHistorialDiasLaborales> {
      const historial = await this.historialDiasLaboralesModel.findByIdAndUpdate(id, historialUpdateDTO, {new: true});
      return historial;
  }

}
