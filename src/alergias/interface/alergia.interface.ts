import { Document } from 'mongoose';

export interface IAlergia extends Document {
  readonly ficha: string;
  readonly tipo_alergia: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}