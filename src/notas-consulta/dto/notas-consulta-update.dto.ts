import { ApiProperty } from "@nestjs/swagger";

export class NotasConsultaUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, required: true, description: 'Descripcion de la consulta' })
    readonly descripcion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Nota activa o inactiva' })
    readonly activo: boolean;

}