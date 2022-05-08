
import { Schema } from 'mongoose';

export const fichaSchema = new Schema({
   
    apellido: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    nombre: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    dni: {
        type: String,
        required: true,
        trim: true
    },

    nro_afiliado: {
        type: String,
        default: '',
        trim: true
    },

    fecha_nacimiento: {
        type: Date,
        default: '',
        trim: true        
    },  

    grupo_sanguineo: {
        type: String,
        default: '',
        trim: true        
    },

    rh: {
        type: String,
        default: '',
        trim: true        
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

},{ timestamps: true });
