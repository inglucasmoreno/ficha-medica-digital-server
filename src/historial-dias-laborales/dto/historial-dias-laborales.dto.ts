import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class HistorialDiasLaboralesDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario de tipo medico' })
    readonly usuario: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: Array, required: true, description: 'Dias laborales' })
    readonly dias_laborales: [];
  
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

}