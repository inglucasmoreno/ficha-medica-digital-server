import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MedicosExternosDTO {
    
    @ApiProperty({ type: String, description: 'Apellido de medico externo' })
    readonly apellido: string;

    @ApiProperty({ type: String, description: 'Nombre de medico externo' })
    readonly nombre: string;

    @ApiProperty({ type: String, description: 'DNI de medico externo' })
    readonly dni: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Medico activo o inactivo' })
    readonly activo: boolean;

}