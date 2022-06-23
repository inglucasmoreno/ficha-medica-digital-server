import { Document } from 'mongoose';

export interface IHistorialDiasLaborales extends Document {
    readonly usuario: string;
    readonly dias_laborales: [];
    readonly creatorUser: Date;
    readonly updatorUser: Date;
}