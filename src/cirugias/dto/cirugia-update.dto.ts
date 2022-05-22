import { ApiProperty } from "@nestjs/swagger";

export class CirugiaUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, required: true, description: 'Tipo de cirugia' })
    readonly tipo_cirugia: string;

    @ApiProperty({ type: Date, required: true, description: 'Fecha de realizacion' })
    readonly fecha_realizacion: Date;

    @ApiProperty({ type: String, required: true, description: 'Fecha de realizacion' })
    readonly institucion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Cirugia activa o inactiva' })
    readonly activo: boolean;

}