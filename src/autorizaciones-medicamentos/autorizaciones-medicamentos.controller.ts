import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AutorizacionesMedicamentosService } from './autorizaciones-medicamentos.service';
import { AutorizacionesMedicamentosUpdateDTO } from './dto/autorizaciones-medicamentos-update.dto';
import { AutorizacionesMedicamentosDTO } from './dto/autorizaciones-medicamentos.dto';

@ApiTags('Autorizaciones de medicamentos')
@Controller('autorizaciones-medicamentos')
export class AutorizacionesMedicamentosController {

    constructor( private autorizacionesMedicamentosService: AutorizacionesMedicamentosService ){}

    // Autorizacion por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Autorizacion obtenida correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de autorizacion', type: 'string'})
    @Get('/:id')
    async getAutorizacion(@Res() res, @Param('id') autorizacionID) {
        const autorizacion = await this.autorizacionesMedicamentosService.getAutorizacion(autorizacionID);
        res.status(HttpStatus.OK).json({
            message: 'Autorizacion obtenida correctamente',
            autorizacion
        });
    }

    // Listar autorizaciones
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de autorizaciones correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarAutorizaciones(@Res() res, @Query() querys) {
        const autorizaciones = await this.autorizacionesMedicamentosService.listarAutorizaciones(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de autorizaciones correcto',
            autorizaciones
        });
    }

    // Crear autorizacion
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Autorizacion creada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: AutorizacionesMedicamentosDTO })
    @Post('/')
    async crearAutorizacion(@Res() res, @Body() autorizacionesMedicamentosDTO: AutorizacionesMedicamentosDTO ) {

        // Se crea una nueva autorizacion
        const autorizacion = await this.autorizacionesMedicamentosService.crearAutorizacion(autorizacionesMedicamentosDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Autorizacion creada correctamente',
            autorizacion
        });
    
    }
        
    // Actualizar autorizacion
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Autorizacion actualizada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de autorizacion', type: 'string'})
    @Put('/:id')
    async actualizarAutorizacion(@Res() res, @Body() autorizacionesMedicamentosUpdateDTO: AutorizacionesMedicamentosUpdateDTO, @Param('id') autorizacionID ) {
        
        const autorizacion = await this.autorizacionesMedicamentosService.actualizarAutorizacion(autorizacionID, autorizacionesMedicamentosUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Autorizacion actualizada correctamente',
            autorizacion
        });

    }

    // Calculos iniciales por ficha
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Autorizaciones obtenidas correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de ficha', type: 'string'})
    @Get('/calculos-iniciales/:id')
    async getAutorizacion2(@Res() res,@Query() querys, @Param('id') fichaID) {
        const resultados = await this.autorizacionesMedicamentosService.calculosIniciales(fichaID, querys);
        res.status(HttpStatus.OK).json({
            message: 'Autorizacion obtenida correctamente',
            resultados
        });
    }

}
