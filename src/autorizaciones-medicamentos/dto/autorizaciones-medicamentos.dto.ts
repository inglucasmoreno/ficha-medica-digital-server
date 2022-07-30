import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AutorizacionesMedicamentosDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de profesional interno' })
    readonly profesional_interno: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de profesional externo' })
    readonly profesional_externo: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Tipo de profesional' })
    readonly profesional_tipo: string;

    @ApiProperty({ type: String, description: 'Diagnostico' })
    readonly diagnostico: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Medicamento' })
    readonly medicamento: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Cantidad' })
    readonly cantidad: number;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Autorizacion activa o inactiva' })
    readonly activo: boolean;

}