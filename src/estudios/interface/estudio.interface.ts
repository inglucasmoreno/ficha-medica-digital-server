import { Document } from 'mongoose';

export interface IEstudio extends Document {
  readonly ficha: string;
  readonly descripcion: string;
  readonly laboratorio: string;
  readonly resultado: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}