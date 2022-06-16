import { Document } from 'mongoose';

export interface ITurno extends Document {
  readonly ficha: string;
  readonly profesional: string;
  readonly fecha_turno: Date;
  readonly cancelado: boolean;
  readonly confirmacion: boolean;
  readonly vencido: boolean;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}