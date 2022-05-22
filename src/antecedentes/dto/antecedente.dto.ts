import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AntecedenteDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion del antecedente' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Antecedente activo o inactivo' })
    readonly activo: boolean;

}