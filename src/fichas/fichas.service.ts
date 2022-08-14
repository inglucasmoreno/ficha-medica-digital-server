import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { FichaDTO } from './dto/ficha.dto';
import { IFicha } from './interface/ficha.interface';
import * as fs from 'fs';
import * as pdf from 'pdf-creator-node';
import { add, format } from 'date-fns';

@Injectable()
export class FichasService {
    
    public url_template_reporte_fichas = process.env.URL_TEMPLATE_REPORTE_FICHAS || './pdf/template/reporte_fichas_medicas.html';
    public url_destino_pdf_reporte_fichas = process.env.URL_DESTINO_PDF_REPORTE_FICHAS || './public/pdf/reporte_fichas_medicas.pdf';

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

    // Ficha por ID
    async getFichaPorDNI(dni: string): Promise<IFicha> {

      const fichaDB = await this.fichaModel.findOne({ dni });
      if(!fichaDB) throw new NotFoundException('La ficha no existe');

      const pipeline = [];

      // Ficha por DNI
      pipeline.push({ $match:{  dni } }) 
  
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
  async listarFichas(querys: any): Promise<any> {
      
      // Parametros
      const {columna, 
             direccion, 
             desde, 
             registerpp, 
             activo, 
             parametro} = querys;

      // Pipelines
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
        pipeline.push({$match: { $or: [ { apellido_nombre: regex }, { dni: regex }, { nro_afiliado: regex } ] }});
        pipelineTotal.push({$match: { $or: [ { apellido_nombre: regex }, { dni: regex }, { nro_afiliado: regex } ] }});
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

      // Busqueda de fichas
      const [fichas, fichasTotal] = await Promise.all([
        this.fichaModel.aggregate(pipeline),
        this.fichaModel.aggregate(pipelineTotal),
      ]);
    
      return {
        fichas,
        totalItems: fichasTotal.length
      };

    }  

    // Crear ficha
    async crearFicha(fichaDTO: FichaDTO): Promise<IFicha> {

        const { dni, nro_afiliado } = fichaDTO;

        // Verificamos que el DNI no este repetido
        const nroAfiliadoDB = await this.fichaModel.findOne({ nro_afiliado });
        if(nroAfiliadoDB) throw new NotFoundException('El Nro de afiliado ya se encuentra registrado');

        // Verificamos que el DNI no este repetido
        const dniDB = await this.fichaModel.findOne({ dni });
        if(dniDB) throw new NotFoundException('El DNI ya se encuentra registrado');

        // Se crea la ficha medica
        const nuevaFicha = new this.fichaModel(fichaDTO);
        return await nuevaFicha.save();
    
      }

    // Actualizar ficha
    async actualizarFicha(id: string, fichaUpdateDTO: any): Promise<IFicha> {

        const { dni, nro_afiliado } = fichaUpdateDTO; 

        // Se verifica si la ficha a actualizar existe
        let fichaDB = await this.getFicha(id);
        if(!fichaDB) throw new NotFoundException('La ficha no existe');

        // Verificacion: Nro de afiliado repetido
        if(nro_afiliado && fichaDB.nro_afiliado !== nro_afiliado){
          const dniRepetido = await this.fichaModel.findOne({ dni });
          if(dniRepetido) throw new NotFoundException('El Nro de afiliado ya se encuentra registrado');
        }

        // Verificacion: DNI repetido
        if(dni && fichaDB.dni !== dni){
          const dniRepetido = await this.fichaModel.findOne({ dni });
          if(dniRepetido) throw new NotFoundException('El DNI ya se encuentra registrado');
        }

        const ficha = await this.fichaModel.findByIdAndUpdate(id, fichaUpdateDTO, {new: true});
        return ficha;
        
    }
 
    // Imprimir fichas
    async reporteFichas(data: any): Promise<String> {

      console.log('Llega a generar');

      // Tempalte
      var html = fs.readFileSync(this.url_template_reporte_fichas, 'utf-8')

      // Opciones de documento
      var options = {
        format: 'A4',
        orientation: 'portrait',
        border: "10mm",
        footer: {
          height: "28mm",
          contents: {}
        }
      }

      // Cambio de formato de fechas
      data.map( ficha => {
        ficha.fecha_alta_string = format(add(new Date(ficha.createdAt),{hours: 3}),'dd/MM/yyyy');
        ficha.fecha_nacimiento_string = format(add(new Date(ficha.fecha_nacimiento),{hours: 3}),'dd/MM/yyyy');
      })

      // Configuraciones de documento
      var document = {
        html: html,
        data: {
          fichas: data,
          fecha: format(new Date(), 'dd/MM/yyyy')
        },
        path: this.url_destino_pdf_reporte_fichas,
        type: ""
      }

      // Generacion de PDF
      await pdf.create(document, options);

      return 'Reporte generado correctamente'
  }
    
}
