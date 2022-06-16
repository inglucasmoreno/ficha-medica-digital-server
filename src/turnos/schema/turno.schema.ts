
import { Schema } from 'mongoose';

export const turnoSchema = new Schema({
   
    ficha: {
      type: Schema.Types.ObjectId,
      ref: 'ficha',
      required: true
    },

    profesional: {
      type: Schema.Types.ObjectId,
      ref: 'usuario',
      required: true
    },

    fecha_turno: {
      type: Date,
      required: true
    },

    cancelado: {
      type: Boolean,
      default: false
    },

    confirmacion: {
      type: Boolean,
      default: false
    },

    vencido: {
      type: Boolean,
      default: false
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

},{ timestamps: true, collection: 'turnos' });
