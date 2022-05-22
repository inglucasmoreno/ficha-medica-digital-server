import { Document } from 'mongoose';

export interface ICirugia extends Document {
  readonly ficha: string;
  readonly tipo_cirugia: string;
  readonly fecha_realizacion: Date;
  readonly institucion: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}