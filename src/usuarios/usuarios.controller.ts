import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import * as bcryptjs from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {

    constructor( private usuariosService: UsuariosService ){}

    // Usuario por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Usuario obteniedo correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de usuario', type: 'string'})
    @Get('/:id')
    async getUsuario(@Res() res, @Param('id') usuarioID) {
        const usuario = await this.usuariosService.getUsuario(usuarioID);
        res.status(HttpStatus.OK).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    }

    // Listar usuarios
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de usuario correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarUsuarios(@Res() res, @Query() querys) {
        const usuarios = await this.usuariosService.listarUsuarios(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de usuarios correcto',
            usuarios
        });
    }

    // Crear usuario
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Usuario creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: UsuarioDTO })
    @Post('/')
    async crearUsuario(@Res() res, @Body() usuarioDTO: UsuarioDTO ) {

        const { password } = usuarioDTO;

        // Se encripta el password
        const salt = bcryptjs.genSaltSync();
        usuarioDTO.password = bcryptjs.hashSync(password, salt);

        // Se crea el nuevo usuario
        const usuarioCreado = await this.usuariosService.crearUsuario(usuarioDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });
    
        }

    // Actualizar usuario
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Usuario actualizado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de usuario', type: 'string'})
    @Put('/:id')
    async actualizarUsuario(@Res() res, @Body() usuarioUpdateDTO: UsuarioUpdateDTO, @Param('id') usuarioID ) {

        const { password } = usuarioUpdateDTO;

        if(password){
            const salt = bcryptjs.genSaltSync();
            usuarioUpdateDTO.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await this.usuariosService.actualizarUsuario(usuarioID, usuarioUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado correctamente',
            usuario
        });

    }

}
