import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TipoMedicoDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de tipo-medico' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Estudio activo o inactivo' })
    readonly activo: boolean;

}