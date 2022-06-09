import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TipoMedicoUpdateDTO } from './dto/tipo-medico-update.dto';
import { TipoMedicoDTO } from './dto/tipo-medico.dto';
import { TipoMedicoService } from './tipo-medico.service';

@ApiTags('Tipo de medicos')
@Controller('tipo-medico')
export class TipoMedicoController {
  
  constructor( private tipoMedicoService: TipoMedicoService ){}

  // Tipo por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Tipo obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de tipo', type: 'string'})
  @Get('/:id')
  async getTipo(@Res() res, @Param('id') tipoID) {
      const tipo = await this.tipoMedicoService.getTipoMedico(tipoID);
      res.status(HttpStatus.OK).json({
          message: 'Tipo obtenido correctamente',
          tipo
      });
  }

  // Listar tipos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de tipos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarTipos(@Res() res, @Query() querys) {
      const tipos = await this.tipoMedicoService.listarTipos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de tipos correcto',
          tipos
      });
  }

  // Crear tipo
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Tipo creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: TipoMedicoDTO })
  @Post('/')
  async crearTipo(@Res() res, @Body() tipoMedicoDTO: TipoMedicoDTO ) {
      const tipo = await this.tipoMedicoService.crearTipo(tipoMedicoDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Tipo creado correctamente',
          tipo
      });
  }
    
  // Actualizar tipo
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Tipo actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de tipo', type: 'string'})
  @Put('/:id')
  async actualizarTipo(@Res() res, @Body() tipoMedicoUpdateDTO: TipoMedicoUpdateDTO, @Param('id') tipoID ) {
      
      const tipo = await this.tipoMedicoService.actualizarTipo(tipoID, tipoMedicoUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Tipo actualizado correctamente',
          tipo
      });

  }

}
