import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FichaDTO } from './dto/ficha.dto';
import { FichaUpdateDTO } from './dto/ficha.dto-update';
import { FichasService } from './fichas.service';

@ApiTags('Fichas')
@Controller('fichas')
export class FichasController {
    
    constructor( private fichasService: FichasService ){}

    // Ficha por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Ficha obtenieda correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de ficha', type: 'string'})
    @Get('/:id')
    async getFicha(@Res() res, @Param('id') fichaID) {
        const ficha = await this.fichasService.getFicha(fichaID);
        res.status(HttpStatus.OK).json({
            message: 'Ficha obtenida correctamente',
            ficha
        });
    }

    // Listar fichas
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de fichas correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarFichas(@Res() res, @Query() querys) {
        const fichas = await this.fichasService.listarFichas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de fichas correcta',
            fichas
        });
    }

    // Crear ficha
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Ficha creada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: FichaDTO })
    @Post('/')
    async crearFicha(@Res() res, @Body() fichaDTO: FichaDTO ) {

        // Se crea la nueva ficha
        const ficha = await this.fichasService.crearFicha(fichaDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Ficha creada correctamente',
            ficha
        });
    
    }

        
    // Actualizar ficha
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Ficha actualizada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de ficha', type: 'string'})
    @Put('/:id')
    async actualizarFicha(@Res() res, @Body() fichaUpdateDTO: FichaUpdateDTO, @Param('id') fichaID ) {
        
        const ficha = await this.fichasService.actualizarFicha(fichaID, fichaUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Ficha actualizada correctamente',
            ficha
        });

    }

    // Reporte de fichas medicas
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Reporte generado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({})
    @Post('/pdf/reporte')
    async reporteFichas(@Res() res, @Body() data: any ) {

        // Se genera el reporte de fichas (PDF)
        await this.fichasService.reporteFichas(data);        
        res.status(HttpStatus.CREATED).json({
            message: 'Reporte generado correctamente'
        });
    
    }

}
