
import { Schema } from 'mongoose';

export const antecedenteSchema = new Schema({
   
    ficha: {
      type: Schema.Types.ObjectId,
      ref: 'ficha',
      required: true
    },

    descripcion: {
      type: String,
      trim: true,
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

},{ timestamps: true, collection: 'antecedentes' });
