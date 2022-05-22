import { ApiProperty } from "@nestjs/swagger";

export class EstudioUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Identificador de ficha' })
    readonly ficha: string;

    @ApiProperty({ type: String, required: true, description: 'Descripcion de estudio' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Laboratorio donde se hizo el estudio' })
    readonly laboratorio: string;

    @ApiProperty({ type: String, required: true, description: 'Resultado del estudio' })
    readonly resultado: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Estudio activo o inactivo' })
    readonly activo: boolean;

}