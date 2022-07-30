import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AutorizacionesMedicamentosDTO } from './dto/autorizaciones-medicamentos.dto';
import { IAutorizacionesMedicamentos } from './interface/autorizaciones-medicamentos.interface';

@Injectable()
export class AutorizacionesMedicamentosService {

    constructor(@InjectModel('AutorizacionesMedicamentos') private readonly autorizacionesMedicamentosModel: Model<IAutorizacionesMedicamentos>){}
  
    // Autorizaciones medicamentos por ID
    async getAutorizacion(id: string): Promise<IAutorizacionesMedicamentos> {
  
        const autorizacionDB = await this.autorizacionesMedicamentosModel.findById(id);
        if(!autorizacionDB) throw new NotFoundException('La autorizacion no existe');
  
        const pipeline = [];

        // // Ficha
        pipeline.push({
            $lookup: { // Lookup
                from: 'fichas',
                localField: 'ficha',
                foreignField: '_id',
                as: 'ficha'
            }}
            );
    
        pipeline.push({ $unwind: '$ficha' });

        // Profesional interno
        pipeline.push({
            $lookup: { // Lookup
                from: 'usuarios',
                localField: 'profesional_interno',
                foreignField: '_id',
                as: 'profesional_interno'
            }}
        );
    
        pipeline.push({ $unwind: '$profesional_interno' });

        // Profesional externo
        pipeline.push({
            $lookup: { // Lookup
                from: 'medicos-externos',
                localField: 'profesional_externo',
                foreignField: '_id',
                as: 'profesional_externo'
            }}
        );
    
        pipeline.push({ $unwind: '$profesional_externo' });

        // Medicamento
        pipeline.push({
            $lookup: { // Lookup
                from: 'medicamentos',
                localField: 'medicamento',
                foreignField: '_id',
                as: 'medicamento'
            }}
        );
    
        pipeline.push({ $unwind: '$medicamento' });

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
  
        const autorizacion = await this.autorizacionesMedicamentosModel.aggregate(pipeline);
        
        return autorizacion[0];
  
    } 
    
    // Listar autorizaciones
    async listarAutorizaciones(querys: any): Promise<IAutorizacionesMedicamentos[]> {
            
        const {columna, direccion, ficha} = querys;
    
        const pipeline = [];
        pipeline.push({$match:{}});

        // Filtrado por ficha - Si es necesario
        if(ficha && ficha.trim() !== ''){
            const idFicha = new Types.ObjectId(ficha);
            pipeline.push({ $match:{ ficha: idFicha } }) 
        }
        
        // Ficha
        pipeline.push({
            $lookup: { // Lookup
                from: 'fichas',
                localField: 'ficha',
                foreignField: '_id',
                as: 'ficha'
            }}
            );
    
        pipeline.push({ $unwind: '$ficha' });

        // Profesional interno
        pipeline.push({
            $lookup: { // Lookup
                from: 'usuarios',
                localField: 'profesional_interno',
                foreignField: '_id',
                as: 'profesional_interno'
            }}
        );
    
        pipeline.push({ $unwind: '$profesional_interno' });

        // Profesional externo
        pipeline.push({
            $lookup: { // Lookup
                from: 'medicos-externos',
                localField: 'profesional_externo',
                foreignField: '_id',
                as: 'profesional_externo'
            }}
        );
    
        pipeline.push({ $unwind: '$profesional_externo' });

        // Medicamento
        pipeline.push({
            $lookup: { // Lookup
                from: 'medicamentos',
                localField: 'medicamento',
                foreignField: '_id',
                as: 'medicamento'
            }}
        );
    
        pipeline.push({ $unwind: '$medicamento' });

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
    
        const autorizaciones = await this.autorizacionesMedicamentosModel.aggregate(pipeline);
        
        return autorizaciones;
    
    }  
  
    // Crear autorizacion
    async crearAutorizacion(autorizacionesMedicamentosDTO: AutorizacionesMedicamentosDTO): Promise<IAutorizacionesMedicamentos> {
        const autorizacion = new this.autorizacionesMedicamentosModel(autorizacionesMedicamentosDTO);
        return await autorizacion.save();
    }
  
    // Actualizar autorizacion
    async actualizarAutorizacion(id: string, autorizacionesMedicamentosUpdateDTO: any): Promise<IAutorizacionesMedicamentos> {
        const autorizacion = await this.autorizacionesMedicamentosModel.findByIdAndUpdate(id, autorizacionesMedicamentosUpdateDTO, {new: true});
        return autorizacion;
    }
    
}
