import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import * as XLSX from 'xlsx';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
import { ITipoMedico } from 'src/tipo-medico/interface/tipo-medico.interface';
import { IFicha } from 'src/fichas/interface/ficha.interface';

@Injectable()
export class InicializacionService {
    
    constructor(
        @InjectModel('Usuario') private readonly usuarioModel: Model<IUsuario>,
        @InjectModel('TipoMedico') private readonly tipoMedicoModel: Model<ITipoMedico>,
        @InjectModel('Ficha') private readonly fichaModel: Model<IFicha>
    ){}

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

    // Se importan fichas desde un documento de excel
    async importarFichas(query: any): Promise<any> {

        const { usuario } = query;
        
        const workbook = XLSX.readFile('./importar/fichas.xlsx');
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        // Verificacion de formato excel
        const condicion = dataExcel.length > 0 &&
                          dataExcel[0].FNAFI &&
                          dataExcel[0].FORDE &&
                          dataExcel[0].APELNOMB &&
                          dataExcel[0].FNDOC

        if(!condicion) throw new NotFoundException('Excel con formato incorrecto');

        let registrosCargados = 0;

        for(const fichaRec of dataExcel){

            let ficha: any = fichaRec;

            if(ficha.FNAFI && ficha.FORDE && ficha.FNDOC && ficha.APELNOMB){
                const data = {
                    nro_afiliado: `${ficha.FNAFI}/${ficha.FORDE}`,
                    apellido_nombre: ficha.APELNOMB,
                    fecha_nacimiento: new Date('01/01/1970'),
                    dni: ficha.FNDOC,
                    creatorUser: usuario,
                    updatorUser: usuario
                }
    
                const fichaDB = await this.fichaModel.findOne({ dni: data.dni });
                if(!fichaDB){
                    registrosCargados += 1;
                    const nuevaFicha = new this.fichaModel(data);
                    await nuevaFicha.save();        
                }
            }

        }              

        if(registrosCargados === 0){
            return 'La base de fichas ya se encuentra actualizada';
        }else{
            return `Cantidad de registros cargados: ${registrosCargados}`
        }


    }

}
