import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAntecedente } from './interface/antecedente.interface';
import * as mongoose  from 'mongoose';
import { AntecedenteDTO } from './dto/antecedente.dto';

@Injectable()
export class AntecedentesService {
  constructor(@InjectModel('Antecedentes') private readonly antecedentesModel: Model<IAntecedente>){}
  
  // Antecedente por ID
  async getAntecedente(id: string): Promise<IAntecedente> {

      const antecedenteDB = await this.antecedentesModel.findById(id);
      if(!antecedenteDB) throw new NotFoundException('El antecedente no existe');

      const pipeline = [];

      // Antecedente por ID
      const idAntecedente = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idAntecedente} }) 
  
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

      const antecedente = await this.antecedentesModel.aggregate(pipeline);
      
      return antecedente[0];

  } 

  // Listar antecedentes por ficha
  async listarAntecedentesPorFicha(id: string, querys: any): Promise<IAntecedente[]> {
      
    const { columna, direccion } = querys;

    const pipeline = [];

    // Antecedente por ficha
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

    const antecedentes = await this.antecedentesModel.aggregate(pipeline);
    
    return antecedentes;

}  

// Listar antecedentes
async listarAntecedentes(querys: any): Promise<IAntecedente[]> {
      
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

    const antecedentes = await this.antecedentesModel.aggregate(pipeline);
    
    return antecedentes;

  }  

  // Crear antecedente
  async crearAntecedente(antecedenteDTO: AntecedenteDTO): Promise<IAntecedente> {
      const nuevoAntecedente = new this.antecedentesModel(antecedenteDTO);
      return await nuevoAntecedente.save();
  }

  // Actualizar antecedente
  async actualizarAntecedente(id: string, antecedenteUpdateDTO: any): Promise<IAntecedente> {
      const antecedente = await this.antecedentesModel.findByIdAndUpdate(id, antecedenteUpdateDTO, {new: true});
      return antecedente;
  }

}
