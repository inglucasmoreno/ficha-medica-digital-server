import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { ITipoMedico } from './interface/tipo-medico.interface';
import { TipoMedicoDTO } from './dto/tipo-medico.dto';

@Injectable()
export class TipoMedicoService {

  constructor(@InjectModel('TipoMedico') private readonly tipoMedicoModel: Model<ITipoMedico>){}
  
  // Tipo medico por ID
  async getTipoMedico(id: string): Promise<ITipoMedico> {

      const tipoDB = await this.tipoMedicoModel.findById(id);
      if(!tipoDB) throw new NotFoundException('El tipo no existe');

      const pipeline = [];

      // Tipo medico por ID
      const idTipo = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idTipo} }); 
  
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

      const tipo = await this.tipoMedicoModel.aggregate(pipeline);
      
      return tipo[0];

  } 

  // Listar tipos
  async listarTipos(querys: any): Promise<ITipoMedico[]> {
        
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

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

      const tipos = await this.tipoMedicoModel.aggregate(pipeline);
      
      return tipos;

  }  

  // Crear tipos
  async crearTipo(tipoMedicoDTO: TipoMedicoDTO): Promise<ITipoMedico> {
      const nuevoTipo = new this.tipoMedicoModel(tipoMedicoDTO);
      return await nuevoTipo.save();
  }

  // Actualizar tipo
  async actualizarTipo(id: string, tipoMedicoUpdateDTO: any): Promise<ITipoMedico> {
      const tipo = await this.tipoMedicoModel.findByIdAndUpdate(id, tipoMedicoUpdateDTO, {new: true});
      return tipo;
  }

}
