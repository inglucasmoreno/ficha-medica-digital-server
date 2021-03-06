import { ApiProperty } from "@nestjs/swagger";

export class AntecedenteUpdateDTO {
    
    @ApiProperty({ type: String, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, description: 'Descripcion del antecedente' })
    readonly descripcion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Antecedente activo o inactivo' })
    readonly activo: boolean;

}