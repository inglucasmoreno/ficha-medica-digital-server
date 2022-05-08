import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FichaDTO } from './dto/ficha.dto';
import { IFicha } from './interface/ficha.interface';

@Injectable()
export class FichasService {
    
    constructor(@InjectModel('Ficha') private readonly fichaModel: Model<IFicha>){}
    
    // Ficha por ID
    async getFicha(id: string): Promise<IFicha> {
        const ficha = await this.fichaModel.findById(id);
        if(!ficha) throw new NotFoundException('La ficha no existe');
        return ficha;
    } 

    // Listar fichas 
    async listarFichas(querys: any): Promise<IFicha[]> {
        
        const {columna, direccion} = querys;

        // Ordenar
        let ordenar = [columna || 'apellido', direccion || 1];

        const fichas = await this.fichaModel.find()
                                            .sort([ordenar]);
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
