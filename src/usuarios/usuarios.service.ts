import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDTO } from './dto/usuarios.dto';
import * as mongoose  from 'mongoose';
import { IUsuario } from './interface/usuarios.interface';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';

export type User = any;

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuariosModel: Model<IUsuario>){}
    
    // Usuario por ID
    async getUsuario(id: string): Promise<IUsuario> {

        let pipeline = [];

        pipeline.push({$match:{_id: new mongoose.Types.ObjectId(id)}})

        // Informacion de usuario actualizador
        pipeline.push({
            $lookup: { // Lookup
                from: 'tipo-medico',
                localField: 'tipo_medico',
                foreignField: '_id',
                as: 'tipo_medico'
            }}
        );
    
        pipeline.push({ $unwind: '$tipo_medico' });

        const usuario = await this.usuariosModel.aggregate(pipeline);

        if(!usuario[0]) throw new NotFoundException('El usuario no existe');
        return usuario[0];
    }  

    // Usuario por nombre de usuario
    async getUsuarioPorNombre(nombreUsuario: string): Promise<IUsuario> {
        const usuario = await this.usuariosModel.findOne({ usuario: nombreUsuario });
        return usuario;
    }  

    // Usuario por DNI
    async getUsuarioPorDni(dniUsuario: string): Promise<IUsuario> {
        const usuario = await this.usuariosModel.findOne({ dni: dniUsuario });
        return usuario;
    }  

    // Usuario por correo
    async getUsuarioPorCorreo(correoUsuario: string): Promise<IUsuario> {
        const usuario = await this.usuariosModel.findOne({ dni: correoUsuario });
        return usuario;
    }  

    // Listar usuarios
    async listarUsuarios(querys: any): Promise<IUsuario[]> {
        
        const {columna, direccion} = querys;

        let pipeline = [];

        pipeline.push({$match: {}});

        // Informacion de usuario actualizador
        pipeline.push({
            $lookup: { // Lookup
                from: 'tipo-medico',
                localField: 'tipo_medico',
                foreignField: '_id',
                as: 'tipo_medico'
            }}
        );
    
        pipeline.push({ $unwind: '$tipo_medico' });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }     

        const usuarios = await this.usuariosModel.aggregate(pipeline);

        return usuarios;
    }  

    // Crear usuario
    async crearUsuario(usuarioDTO: UsuarioDTO): Promise<IUsuario> {

        const { usuario, dni, email, password } = usuarioDTO;

        // Verificamos que el usuarios no este repetido
        let usuarioDB = await this.getUsuarioPorNombre(usuario);
        if(usuarioDB) throw new NotFoundException('El nombre de usuario ya esta registrado');

        // Verificamos que el DNI no este repetido
        usuarioDB = await this.getUsuarioPorDni(dni);
        if(usuarioDB) throw new NotFoundException('El dni ya se encuentra registrado');

        // Verificamos que el correo no este repetido
        usuarioDB = await this.getUsuarioPorCorreo(email);
        if(usuarioDB) throw new NotFoundException('El correo ya se encuentra registrado');

        const nuevoUsuario = new this.usuariosModel(usuarioDTO);
        return await nuevoUsuario.save();

    }

    // Actualizar usuario
    async actualizarUsuario(id: string, usuarioUpdateDTO: UsuarioUpdateDTO): Promise<IUsuario> {

        const { dni, usuario } = usuarioUpdateDTO;

        // Se verifica si el usuario a actualizar existe
        let usuarioDB = await this.getUsuario(id);
        if(!usuarioDB) throw new NotFoundException('El usuario no existe');
        
        // Verificamos que el usuarios no este repetido
        if(usuario && usuarioDB.usuario !== usuario){
            const usuarioDBNombre = await this.getUsuarioPorNombre(usuario);
            if(usuarioDBNombre) throw new NotFoundException('El nombre de usuario ya esta registrado');
        }
               
        // Verificamos que el DNI no este repetido
        if(dni && usuarioDB.dni !== dni){
            const usuarioDBPassword = await this.getUsuarioPorDni(dni);
            if(usuarioDBPassword) throw new NotFoundException('El dni ya se encuentra registrado');
        }

        const usuarioRes = await this.usuariosModel.findByIdAndUpdate(id, usuarioUpdateDTO, {new: true});
        return usuarioRes;
        
    }

}
