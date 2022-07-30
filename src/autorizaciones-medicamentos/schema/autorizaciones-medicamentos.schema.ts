
import { Schema } from 'mongoose';

export const autorizacionesMedicamentosSchema = new Schema({
   
    ficha: {
        type: Schema.Types.ObjectId,
        ref: 'ficha',
        required: true
    },

    profesional_interno: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },

    profesional_externo: {
        type: Schema.Types.ObjectId,
        ref: 'medicos-externos',
        required: true
    },

    profesional_tipo: {
      type: String,
      trim: true,
      required: true
    },

    diagnostico: {
        type: String,
        trim: true,
        uppercase: true,
        default: ''
    },

    medicamento: {
        type: Schema.Types.ObjectId,
        ref: 'medicamentos',
        required: true
    },

    cantidad: {
        type: Number,
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

},{ timestamps: true, collection: 'autorizaciones-medicamentos' });
