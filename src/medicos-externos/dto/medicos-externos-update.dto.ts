import { ApiProperty } from "@nestjs/swagger";

export class MedicosExternosUpdateDTO {
    
    @ApiProperty({ type: String, description: 'Apellido de medico externo' })
    readonly apellido: string;

    @ApiProperty({ type: String, description: 'Nombre de medico externo' })
    readonly nombre: string;

    @ApiProperty({ type: String, description: 'DNI de medico externo' })
    readonly dni: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Medico activo o inactivo' })
    readonly activo: boolean;

}