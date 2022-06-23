import { Schema } from 'mongoose';

export const historialDiasLaboralesSchema = new Schema({

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuario',
    required: true
  },

  dias_laborales: {
    type: Array,
    required: true
  },

  creatorUser: {
    type: Schema.Types.ObjectId,
    ref: 'usuario',
    required: true
  },

  updatorUser: {
      type: Schema.Types.ObjectId,
      ref: 'usuario',
      required: true
  },


},{timestamps: true, collection: 'historial-dias-laborales'});