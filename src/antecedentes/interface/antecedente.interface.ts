import { Document } from 'mongoose';

export interface IAntecedente extends Document {
  readonly ficha: string;
  readonly descripcion: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}