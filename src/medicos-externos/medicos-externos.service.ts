import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicosExternosDTO } from './dto/medicos-externos.dto';
import { IMedicosExternos } from './interface/medicos-externos.interface';

@Injectable()
export class MedicosExternosService {
    
    constructor(@InjectModel('MedicosExternos') private readonly medicosExternosModel: Model<IMedicosExternos>){}
  
    // Medico externo por ID
    async getMedico(id: string): Promise<IMedicosExternos> {
  
        const medicosDB = await this.medicosExternosModel.findById(id);
        if(!medicosDB) throw new NotFoundException('El medico no existe');
  
        const pipeline = [];
    
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
  
        const medico = await this.medicosExternosModel.aggregate(pipeline);
        
        return medico[0];
  
    } 
    
    // Listar medicos
    async listarMedicos(querys: any): Promise<IMedicosExternos[]> {
            
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
    
        const medicos = await this.medicosExternosModel.aggregate(pipeline);
        
        return medicos;
    
        }  
  
    // Crear medico
    async crearMedico(medicosExternosDTO: MedicosExternosDTO): Promise<IMedicosExternos> {
        const medico = new this.medicosExternosModel(medicosExternosDTO);
        return await medico.save();
    }
  
    // Actualizar medico
    async actualizarMedico(id: string, medicosExternosUpdateDTO: any): Promise<IMedicosExternos> {
        const medico = await this.medicosExternosModel.findByIdAndUpdate(id, medicosExternosUpdateDTO, {new: true});
        return medico;
    }
}
