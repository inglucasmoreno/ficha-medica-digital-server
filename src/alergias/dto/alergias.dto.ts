import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AlergiaDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Tipo de alergia' })
    readonly tipo_alergia: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Alergia activa o inactiva' })
    readonly activo: boolean;

}