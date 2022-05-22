import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITurno } from './interface/turno.interface';
import * as mongoose  from 'mongoose';
import { TurnoDTO } from './dto/turno.dto';

@Injectable()
export class TurnosService {
  constructor(@InjectModel('Turnos') private readonly turnosModel: Model<ITurno>){}
  
  // Turno por ID
  async getTurno(id: string): Promise<ITurno> {

      const turnoDB = await this.turnosModel.findById(id);
      if(!turnoDB) throw new NotFoundException('El turno no existe');

      const pipeline = [];

      // Turno por ID
      const idTurno = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idTurno} }) 

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

      // Informacion de profesional
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'profesional',
            foreignField: '_id',
            as: 'profesional'
        }}
      );

      pipeline.push({ $unwind: '$profesional' });

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

      const turno = await this.turnosModel.aggregate(pipeline);
      
      return turno[0];

  } 

  // Listar turnos
  async listarTurnos(querys: any): Promise<ITurno[]> {
      
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

    // Informacion de profesional
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'profesional',
          foreignField: '_id',
          as: 'profesional'
      }}
    );

    pipeline.push({ $unwind: '$profesional' });

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

    const turnos = await this.turnosModel.aggregate(pipeline);
    
    return turnos;

  }  

  // Crear turno
  async crearTurno(turnoDTO: TurnoDTO): Promise<ITurno> {
      const nuevoTurno = new this.turnosModel(turnoDTO);
      return await nuevoTurno.save();
  }

  // Actualizar turno
  async actualizarTurno(id: string, turnoUpdateDTO: any): Promise<ITurno> {
      const turno = await this.turnosModel.findByIdAndUpdate(id, turnoUpdateDTO, {new: true});
      return turno;
  }

}
