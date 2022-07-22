import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MedicamentosDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion del medicamento' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Medicamento activo o inactivo' })
    readonly activo: boolean;

}