import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HistorialDiasLaboralesUpdateDTO } from './dto/historial-dias-laborales-update.dto';
import { HistorialDiasLaboralesDTO } from './dto/historial-dias-laborales.dto';
import { HistorialDiasLaboralesService } from './historial-dias-laborales.service';

@ApiTags('Historial-Dias_Laborales')
@Controller('historial-dias-laborales')
export class HistorialDiasLaboralesController {

  constructor( private historialDiasLaboralesService: HistorialDiasLaboralesService ){}

  // Historial por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Historial obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de historial', type: 'string'})
  @Get('/:id')
  async getHistorial(@Res() res, @Param('id') historialID) {
      const historial = await this.historialDiasLaboralesService.getHistorial(historialID);
      console.log(historial);
      res.status(HttpStatus.OK).json({
          message: 'Historial obtenido correctamente',
          historial
      });
  }

  // Listar historiales
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de historial correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarHistoriales(@Res() res, @Query() querys) {
      const historial = await this.historialDiasLaboralesService.listarHistoriales(querys);
      res.status(HttpStatus.OK).json({
          message: 'Historial correcto',
          historial
      });
  }

  // Listar historial por usuario
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Historial correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/usuario/:id')
  async listarHistorialPorUsuario(@Res() res, @Query() querys, @Param('id') usuarioId) {
      const historial = await this.historialDiasLaboralesService.listarHistorialPorUsuario(usuarioId, querys);
      res.status(HttpStatus.OK).json({
          message: 'Historial correcto',
          historial
      });
  }

  // Crear elemento en historial
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Historial creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: HistorialDiasLaboralesDTO })
  @Post('/')
  async crearHistorial(@Res() res, @Body() historialDTO: HistorialDiasLaboralesDTO ) {

      // Se crea un nuevo elemento para el historial
      const historial = await this.historialDiasLaboralesService.crearHistorial(historialDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Historial creado correctamente',
          historial
      });

  }
    
  // Actualizar historial
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Historial actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de historial', type: 'string'})
  @Put('/:id')
  async actualizarHistorial(@Res() res, @Body() historialUpdateDTO: HistorialDiasLaboralesUpdateDTO, @Param('id') historialID ) {
      
      const historial = await this.historialDiasLaboralesService.actualizarHistorial(historialID, historialUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Historial actualizado correctamente',
          historial
      });

  }

}
