import { ApiProperty } from "@nestjs/swagger";

export class UsuarioUpdateDTO {
    
    @ApiProperty({ type: String, description: 'Nombre de usuario (Ingreso al sistema)' })
    readonly usuario: string;
    
    @ApiProperty({ type: String, description: 'Documento Nacional de Identidad' })
    readonly dni: string;
    
    @ApiProperty({ type: String, description: 'Apellido de la persona' })
    readonly apellido: string;
   
    @ApiProperty({ type: String, description: 'Nombre de la persona' })
    readonly nombre: string;
    
    @ApiProperty({ type: String, description: 'Contraseña de acceso al sistema' })
    password: string;
    
    @ApiProperty({ type: String, description: 'Tipo de medico (Para usuarios de tipo medico)' })
    readonly tipo_medico: string;

    @ApiProperty({ type: Array, description: 'Dias laborales (Para usuarios de tipo medico)' })
    readonly dias_laborales: [];

    @ApiProperty({ type: String, description: 'Correo electronico' })
    readonly email: string;
    
    @ApiProperty({ type: String, description: 'Rol dentro del sistema' })
    readonly role: string;

    @ApiProperty({ type: Array, description: 'Permisos de usuario'})
    readonly permisos: []
    
    @ApiProperty({ type: Boolean, description: 'Usuario activo o inactivo' })
    readonly activo: boolean;
    

}