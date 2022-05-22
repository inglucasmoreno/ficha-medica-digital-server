import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotasConsultaUpdateDTO } from './dto/notas-consulta-update.dto';
import { NotasConsultaDTO } from './dto/notas-consulta.dto';
import { NotasConsultaService } from './notas-consulta.service';

@ApiTags('Notas-Consulta')
@Controller('notas-consulta')
export class NotasConsultaController {
  
    constructor( private notasConsultaService: NotasConsultaService ){}

    // Nota por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Nota obtenieda correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de nota', type: 'string'})
    @Get('/:id')
    async getNota(@Res() res, @Param('id') notaID) {
        const nota = await this.notasConsultaService.getNota(notaID);
        res.status(HttpStatus.OK).json({
            message: 'Nota obtenida correctamente',
            nota
        });
    }

    // Listar notas
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de notas correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarNotas(@Res() res, @Query() querys) {
        const notas = await this.notasConsultaService.listarNotas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de notas correcta',
            notas
        });
    }

    // Listar notas por ficha
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de notas correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/ficha/:id')
    async listarNotasPorFicha(@Res() res, @Query() querys, @Param('id') fichaId) {
        const notas = await this.notasConsultaService.listarNotasPorFicha(fichaId, querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de notas correcta',
            notas
        });
    }

  // Crear nota
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Nota creada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: NotasConsultaDTO })
  @Post('/')
  async crearNota(@Res() res, @Body() notaDTO: NotasConsultaDTO ) {

      // Se crea la nueva nota
      const nota = await this.notasConsultaService.crearNota(notaDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Nota creada correctamente',
          nota
      });
  
  }
      
  // Actualizar nota
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Nota actualizada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de nota', type: 'string'})
  @Put('/:id')
  async actualizarNota(@Res() res, @Body() notaUpdateDTO: NotasConsultaUpdateDTO, @Param('id') notaID ) {
      
      const nota = await this.notasConsultaService.actualizarNota(notaID, notaUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Nota actualizada correctamente',
          nota
      });

  }

}
