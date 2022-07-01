import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EstudioUpdateDTO } from './dto/estudio-update.dto';
import { EstudioDTO } from './dto/estudio.dto';
import { EstudiosService } from './estudios.service';

@ApiTags('Estudios')
@Controller('estudios')
export class EstudiosController {
  constructor( private estudiosService: EstudiosService ){}

  // Estudio por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Estudio obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de estudio', type: 'string'})
  @Get('/:id')
  async getEstudio(@Res() res, @Param('id') estudioID) {
      const estudio = await this.estudiosService.getEstudio(estudioID);
      res.status(HttpStatus.OK).json({
          message: 'Estudio obtenido correctamente',
          estudio
      });
  }

  // Listar estudios
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de estudios correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarEstudios(@Res() res, @Query() querys) {
      const estudios = await this.estudiosService.listarEstudios(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de estudios correcto',
          estudios
      });
  }

  // Listar estudios por ficha
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de estudios correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/ficha/:id')
  async listadoEstudiosPorFicha(@Res() res, @Query() querys, @Param('id') estudioId) {
      const estudios = await this.estudiosService.listarEstudiosPorFicha(estudioId, querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de estudios correcta',
          estudios
      });
  }

  // Crear estudio
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Estudio creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: EstudioDTO })
  @Post('/')
  async crearEstudio(@Res() res, @Body() estudioDTO: EstudioDTO ) {
      const estudio = await this.estudiosService.crearEstudio(estudioDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Estudio creado correctamente',
          estudio
      });
  }
    
  // Actualizar estudio
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Estudio actualizada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de estudio', type: 'string'})
  @Put('/:id')
  async actualizarEstudio(@Res() res, @Body() estudioUpdateDTO: EstudioUpdateDTO, @Param('id') estudioID ) {
      
      const estudio = await this.estudiosService.actualizarEstudio(estudioID, estudioUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Estudio actualizado correctamente',
          estudio
      });

  }  
}
