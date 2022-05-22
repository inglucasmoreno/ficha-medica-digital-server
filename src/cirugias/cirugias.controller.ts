import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CirugiasService } from './cirugias.service';
import { CirugiaUpdateDTO } from './dto/cirugia-update.dto';
import { CirugiaDTO } from './dto/cirugia.dto';

@ApiTags('Cirugias')
@Controller('cirugias')
export class CirugiasController {
  constructor( private cirugiasService: CirugiasService ){}

  // Cirugias por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Cirugia obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de cirugia', type: 'string'})
  @Get('/:id')
  async getCirugia(@Res() res, @Param('id') cirugiaID) {
      const cirugia = await this.cirugiasService.getCirugia(cirugiaID);
      res.status(HttpStatus.OK).json({
          message: 'Cirugia obtenido correctamente',
          cirugia
      });
  }

  // Listar cirugias
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de cirugias correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarCirugias(@Res() res, @Query() querys) {
      const cirugias = await this.cirugiasService.listarCirugias(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de cirugias correcto',
          cirugias
      });
  }

  // Listar cirugias por ficha
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de cirugias correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/ficha/:id')
  async listadoCirugiaPorFicha(@Res() res, @Query() querys, @Param('id') cirugiaId) {
      const cirugias = await this.cirugiasService.listarCirugiasPorFicha(cirugiaId, querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de cirugias correcta',
          cirugias
      });
  }

  // Crear cirugias
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Cirugia creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: CirugiaDTO })
  @Post('/')
  async crearCirugia(@Res() res, @Body() cirugiaDTO: CirugiaDTO ) {
      const cirugia = await this.cirugiasService.crearCirugia(cirugiaDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Cirugia creado correctamente',
          cirugia
      });
  }
    
  // Actualizar cirugia
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Cirugia actualizada correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de cirugia', type: 'string'})
  @Put('/:id')
  async actualizarCirugia(@Res() res, @Body() cirugiaUpdateDTO: CirugiaUpdateDTO, @Param('id') cirugiaID ) {
      
      const cirugia = await this.cirugiasService.actualizarCirugia(cirugiaID, cirugiaUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Cirugia actualizada correctamente',
          cirugia
      });

  }
}
