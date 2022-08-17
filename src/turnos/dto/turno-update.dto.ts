import { ApiProperty } from "@nestjs/swagger";

export class TurnoUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, default: '', description: 'Telefono' })
    readonly telefono: string;

    @ApiProperty({ type: String, required: true, description: 'Profesional' })
    readonly profesional: string;

    @ApiProperty({ type: String, required: true, description: 'Fecha del turno' })
    readonly fecha_turno: string;

    @ApiProperty({ type: Boolean, description: 'Cancelacion del turno' })
    readonly cancelado: boolean;

    @ApiProperty({ type: Boolean, required: true, description: 'Confirmacion del turno' })
    readonly confirmacion: boolean;

    @ApiProperty({ type: Boolean, description: 'Turno vencido' })
    readonly vencido: boolean;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Turno activo o inactivo' })
    readonly activo: boolean;

}