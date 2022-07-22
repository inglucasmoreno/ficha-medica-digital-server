import { ApiProperty } from "@nestjs/swagger";

export class MedicamentosUpdateDTO {
    
    @ApiProperty({ type: String, description: 'Descripcion del medicamento' })
    readonly descripcion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Antecedente activo o inactivo' })
    readonly activo: boolean;

}