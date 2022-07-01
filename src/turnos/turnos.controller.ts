import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TurnoUpdateDTO } from './dto/turno-update.dto';
import { TurnoDTO } from './dto/turno.dto';
import { TurnosService } from './turnos.service';

@ApiTags('Turnos')
@Controller('turnos')
export class TurnosController {
  constructor( private turnosService: TurnosService ){}

    // Turnos por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Turno obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de turno', type: 'string'})
    @Get('/:id')
    async getTurnos(@Res() res, @Param('id') turnoID) {
        const turno = await this.turnosService.getTurno(turnoID);
        res.status(HttpStatus.OK).json({
            message: 'Turno obtenido correctamente',
            turno
        });
    }

    // Listar turnos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de turnos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarTurnos(@Res() res, @Query() querys) {
        const turnos = await this.turnosService.listarTurnos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de turnos correcto',
            turnos
        });
    }

    // Listar turnos por ficha
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de turnos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/filtrado/ficha')
    async listarTurnosPorFicha(@Res() res, @Query() querys) {
        const turnos = await this.turnosService.listarTurnosPorFicha(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de turnos correcto',
            turnos
        });
    }

    // Reporte de turnos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de turnos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/seccion/reportes/finales')
    async reporteTurnos(@Res() res, @Query() querys) {
        const turnos = await this.turnosService.reporteTurnos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de turnos correcto',
            turnos
        });
    }

    // Crear turnos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Turnos creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: TurnoDTO })
    @Post('/')
    async crearTurno(@Res() res, @Body() turnoDTO: TurnoDTO ) {
        const turno = await this.turnosService.crearTurno(turnoDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Turno creado correctamente',
            turno
        });
    }

    // Turnos vencidos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Turnos actualizados correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/vencidos/baja')
    async turnosVencidos(@Res() res) {
        
        const turnos = await this.turnosService.turnosVencidos();

        res.status(HttpStatus.OK).json({
            message: 'Turnos actualizados correctamente',
            turnos
        });

    }

    // Actualizar turno
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Turno actualizado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de turno', type: 'string'})
    @Put('/:id')
    async actualizarTurno(@Res() res, @Body() turnoUpdateDTO: TurnoUpdateDTO, @Param('id') turnoID ) {
        
        const turno = await this.turnosService.actualizarTurno(turnoID, turnoUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Turno actualizado correctamente',
            turno
        });

    }

}
