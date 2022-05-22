import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AlergiasService } from './alergias.service';
import { AlergiaUpdateDTO } from './dto/alergias-update.dto';
import { AlergiaDTO } from './dto/alergias.dto';

@ApiTags('Alergias')
@Controller('alergias')
export class AlergiasController {
  constructor( private alergiasService: AlergiasService ){}

  // Alergia por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Alergia obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de alergia', type: 'string'})
  @Get('/:id')
  async getAlergia(@Res() res, @Param('id') alergiaID) {
      const alergia = await this.alergiasService.getAlergia(alergiaID);
      res.status(HttpStatus.OK).json({
          message: 'Alergia obtenida correctamente',
          alergia
      });
  }

  // Listar alergias
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de alergias correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarAlergias(@Res() res, @Query() querys) {
      const alergias = await this.alergiasService.listarAlergias(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de alergias correcto',
          alergias
      });
  }

  // Listar alergias por ficha
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de alergias correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/ficha/:id')
  async listadoAlergiasPorFicha(@Res() res, @Query() querys, @Param('id') alergiaId) {
      const alergias = await this.alergiasService.listarAlergiasPorFicha(alergiaId, querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de alergias correcta',
          alergias
      });
  }

  // Crear alergia
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Alergia creada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: AlergiaDTO })
  @Post('/')
  async crearAlergia(@Res() res, @Body() alergiaDTO: AlergiaDTO ) {
      const alergia = await this.alergiasService.crearAlergia(alergiaDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Alergia creada correctamente',
          alergia
      });
  }
    
  // Actualizar alergia
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Alergia actualizada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de alergia', type: 'string'})
  @Put('/:id')
  async actualizarAlergia(@Res() res, @Body() alergiaUpdateDTO: AlergiaUpdateDTO, @Param('id') alergiaID ) {
      
      const alergia = await this.alergiasService.actualizarAlergia(alergiaID, alergiaUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Alergia actualizado correctamente',
          alergia
      });

  }
}
