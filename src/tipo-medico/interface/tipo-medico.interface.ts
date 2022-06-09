import { Document } from 'mongoose';

export interface ITipoMedico extends Document {
  readonly descripcion: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}