import { Document } from 'mongoose';

export interface IAutorizacionesMedicamentos extends Document {
  readonly ficha: string;
  readonly profesional_interno: string;
  readonly profesional_externo: string;
  readonly profesional_tipo: string;
  readonly diagnostico: string;
  readonly medicamento: string;
  readonly cantidad: string;
  readonly creatorUser: Date;
  readonly updatorUser: Date;
  readonly activo: boolean;
}