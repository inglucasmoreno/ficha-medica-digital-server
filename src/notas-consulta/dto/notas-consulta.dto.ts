import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NotasConsultaDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de la consulta' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Nota activa o inactiva' })
    readonly activo: boolean;

}