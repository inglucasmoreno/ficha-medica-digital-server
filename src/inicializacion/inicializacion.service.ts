import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
import { ITipoMedico } from 'src/tipo-medico/interface/tipo-medico.interface';

@Injectable()
export class InicializacionService {
    
    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<IUsuario>,
                @InjectModel('TipoMedico') private readonly tipoMedicoModel: Model<ITipoMedico>){}

    async initUsuarios(): Promise<any> {
        
        // 1) - Verificacion
        const verificacion = await this.usuarioModel.find();
        if(verificacion.length != 0) throw new NotFoundException('Los usuarios ya fueron inicializados');

        // 2) - Se crea usuario administrador
        const data: any = {
            usuario: 'admin',
            apellido: 'Admin',
            nombre: 'Admin',
            dni: '34060399',
            email: 'admin@gmail.com',
            role: 'ADMIN_ROLE',
            tipo_medico: '000000000000000000000000', // ID de inicializacion
            activo: true
        }
    
        // Generacion de password encriptado
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync('admin', salt);
    
        // Se crea y se almacena en la base de datos al usuario administrador
        const usuario = new this.usuarioModel(data);
        const usuarioDB = await usuario.save();

        // 3) - Se inicializa el tipo medico por defecto
        
        const dataTipo = {
            _id: '000000000000000000000000',
            descripcion: 'NO ES MEDICO',
            creatorUser: usuarioDB._id,
            updatorUser: usuarioDB._id
        } 

        const tipo = new this.tipoMedicoModel(dataTipo);
        await tipo.save();
    
    }

}
