import { ApiProperty } from "@nestjs/swagger";

export class TipoMedicoUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Descripcion de tipo-medico' })
    readonly descripcion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Estudio activo o inactivo' })
    readonly activo: boolean;

}