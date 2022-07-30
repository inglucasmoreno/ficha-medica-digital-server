
import { Schema } from 'mongoose';

export const medicosExternosSchema = new Schema({
   
    apellido: {
      type: String,
      trim: true,
      uppercase: true,
      required: true
    },

    nombre: {
        type: String,
        trim: true,
        uppercase: true,
        required: true
    },

    dni: {
        type: String,
        trim: true,
        uppercase: true,
        default: ''
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

},{ timestamps: true, collection: 'medicos-externos' });
