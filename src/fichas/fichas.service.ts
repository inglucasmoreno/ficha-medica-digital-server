import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { FichaDTO } from './dto/ficha.dto';
import { IFicha } from './interface/ficha.interface';

@Injectable()
export class FichasService {
    
    constructor(@InjectModel('Ficha') private readonly fichaModel: Model<IFicha>){}
    
    // Ficha por ID
    async getFicha(id: string): Promise<IFicha> {

        const fichaDB = await this.fichaModel.findById(id);
        if(!fichaDB) throw new NotFoundException('La ficha no existe');
  
        const pipeline = [];
  
        // Ficha por ID
        const idFicha = new mongoose.Types.ObjectId(id);
        pipeline.push({ $match:{ _id: idFicha} }) 
    
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
  
        const ficha = await this.fichaModel.aggregate(pipeline);
        
        return ficha[0];

    } 

    // Listar fichas 
    async listarFichas(querys: any): Promise<IFicha[]> {
        
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
  
        const fichas = await this.fichaModel.aggregate(pipeline);
        
        return fichas;

    }  

    // Crear ficha
    async crearFicha(fichaDTO: FichaDTO): Promise<IFicha> {
        const nuevaFicha = new this.fichaModel(fichaDTO);
        return await nuevaFicha.save();
    }

    // Actualizar ficha
    async actualizarFicha(id: string, fichaUpdateDTO: any): Promise<IFicha> {

        let fichaDB = await this.getFicha(id);
        if(!fichaDB) throw new NotFoundException('La ficha no existe');

        const ficha = await this.fichaModel.findByIdAndUpdate(id, fichaUpdateDTO, {new: true});
        return ficha;
        
    }
    
}
