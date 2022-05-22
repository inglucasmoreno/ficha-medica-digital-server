import { ApiProperty } from "@nestjs/swagger";

export class AlergiaUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, required: true, description: 'Tipo de alergia' })
    readonly tipo_alergia: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Alergia activa o inactiva' })
    readonly activo: boolean;

}