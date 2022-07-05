import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Date } from "mongoose";

export class FichaDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Apellido y nombre de la persona' })
    readonly apellido_nombre: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'DNI de la persona' })
    readonly dni: string;
   
    @ApiProperty({ type: String, required: true, description: 'Numero de afiliado' })
    readonly nro_afiliado: string;

    @ApiProperty({ type: Date, description: 'Fecha de nacimiento' })
    readonly fecha_nacimiento: Date;
    
    @ApiProperty({ type: String, description: 'Grupo sanguineo' })
    readonly grupo_sanguineo: string;
    
    @ApiProperty({ type: String, description: 'RH' })
    readonly rh: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Ficha activa o inactiva' })
    readonly activo: boolean;

}