import { Document } from 'mongoose';

export interface IMedicamentos extends Document {
  readonly descripcion: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}