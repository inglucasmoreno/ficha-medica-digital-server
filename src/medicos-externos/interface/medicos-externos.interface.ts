import { Document } from 'mongoose';

export interface IMedicosExternos extends Document {
  readonly apellido: string;
  readonly nombre: string;
  readonly dni: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}