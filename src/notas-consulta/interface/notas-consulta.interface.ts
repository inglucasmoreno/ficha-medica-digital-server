import { Document } from 'mongoose';

export interface INotasConsulta extends Document {
  readonly ficha: string;
  readonly descripcion: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}