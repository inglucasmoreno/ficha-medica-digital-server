import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicamentosDTO } from './dto/medicamentos.dto';
import { IMedicamentos } from './interface/medicamentos.interface';

@Injectable()
export class MedicamentosService {
 
  constructor(@InjectModel('Medicamentos') private readonly medicamentosModel: Model<IMedicamentos>){}
  
  // Medicamento por ID
  async getMedicamento(id: string): Promise<IMedicamentos> {

      const medicamentoDB = await this.medicamentosModel.findById(id);
      if(!medicamentoDB) throw new NotFoundException('El medicamento no existe');

      const pipeline = [];

      // Medicamentos por ID
      const idMedicamento = new Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idMedicamento } }) 
  
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

      const medicamento = await this.medicamentosModel.aggregate(pipeline);
      
      return medicamento[0];

  } 

// Listar medicamentos
async listarMedicamentos(querys: any): Promise<IMedicamentos[]> {
      
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

    const medicamentos = await this.medicamentosModel.aggregate(pipeline);
    
    return medicamentos;

  }  

  // Crear medicamento
  async crearMedicamento(medicamentosDTO: MedicamentosDTO): Promise<IMedicamentos> {
      const nuevoMedicamento = new this.medicamentosModel(medicamentosDTO);
      return await nuevoMedicamento.save();
  }

  // Actualizar medicamento
  async actualizarMedicamento(id: string, medicamentosUpdateDTO: any): Promise<IMedicamentos> {
      const medicamento = await this.medicamentosModel.findByIdAndUpdate(id, medicamentosUpdateDTO, {new: true});
      return medicamento;
  }

}
