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
async listarMedicamentos(querys: any): Promise<any> {
      
    // Parametros
    const {columna, 
      direccion, 
      desde, 
      registerpp, 
      activo, 
      parametro} = querys;

    // Pipeline
    const pipeline = [];
    const pipelineTotal = [];

    // Match iniciales
    pipeline.push({$match:{}});
    pipelineTotal.push({$match:{}});

    // Ordenando datos
    const ordenar: any = {};
    if(columna){
        ordenar[String(columna)] = Number(direccion);
        pipeline.push({$sort: ordenar});
    }  

    // Activo / Inactivo
    let filtroActivo = {};
    if(activo && activo !== '') {
      filtroActivo = { activo: activo === 'true' ? true : false };
      pipeline.push({$match: filtroActivo});
      pipelineTotal.push({$match: filtroActivo});
    }

    // Filtro por parametros
    if(parametro && parametro !== ''){
      const regex = new RegExp(parametro, 'i');
      pipeline.push({$match: { $or: [ { nombre_comercial: regex }, { descripcion: regex } ] }});
      pipelineTotal.push({$match: { $or: [ { nombre_comercial: regex }, { descripcion: regex } ] }});
    }

    // Paginacion
    pipeline.push({$skip: Number(desde)}, {$limit: Number(registerpp)});

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

    // Busqueda de medicamentos
    const [medicamentos, medicamentosTotal] = await Promise.all([
      this.medicamentosModel.aggregate(pipeline),
      this.medicamentosModel.aggregate(pipelineTotal),
    ]);
  
    return {
      medicamentos,
      totalItems: medicamentosTotal.length
    };

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
