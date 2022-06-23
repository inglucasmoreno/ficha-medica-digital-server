import { ApiProperty } from "@nestjs/swagger";

export class HistorialDiasLaboralesUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Usuario de tipo medico' })
    readonly usuario: string;
    
    @ApiProperty({ type: Array, required: true, description: 'Dias laborales' })
    readonly dias_laborales: [];
  
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

}