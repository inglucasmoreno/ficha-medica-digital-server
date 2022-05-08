import { Document } from 'mongoose';

export interface IFicha extends Document {
    readonly apellido: string;
    readonly nombre: string;
    readonly dni: string;
    readonly nro_afiliado: string;
    readonly fecha_nacimiento: Date;
    readonly grupo_sanguineo: string;
    readonly rh: string;
    readonly creatorUser: Date;
    readonly updatorUser: Date;
    readonly activo: boolean;
}