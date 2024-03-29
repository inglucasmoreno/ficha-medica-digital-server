
import { Schema } from 'mongoose';

export const medicamentosSchema = new Schema({
   
    nombre_comercial: {
        type: String,
        trim: true,
        uppercase: true,
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

},{ timestamps: true, collection: 'medicamentos' });
