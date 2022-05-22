
import { Schema } from 'mongoose';

export const cirugiasSchema = new Schema({
   
    ficha: {
      type: Schema.Types.ObjectId,
      ref: 'ficha',
      required: true
    },

    tipo_cirugia: {
      type: String,
      trim: true,
      uppercase: true,
      required: true
    },

    fecha_realizacion: {
      type: Date,
      required: true
    },

    institucion: {
      type: String,
      uppercase: true,
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

    activo: {
        type: Boolean,
        required: true,
        default: true
    }

},{ timestamps: true, collection: 'cirugias' });
