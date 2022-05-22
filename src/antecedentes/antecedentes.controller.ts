import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AntecedentesService } from './antecedentes.service';
import { AntecedenteUpdateDTO } from './dto/antecedente-update.dto';
import { AntecedenteDTO } from './dto/antecedente.dto';

@ApiTags('Antecedentes')
@Controller('antecedentes')
export class AntecedentesController {

  constructor( private antecedentesService: AntecedentesService ){}

  // Antecedente por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Antecedente obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de antecedente', type: 'string'})
  @Get('/:id')
  async getAntecedentes(@Res() res, @Param('id') notaID) {
      const antecedente = await this.antecedentesService.getAntecedente(notaID);
      res.status(HttpStatus.OK).json({
          message: 'Antecedente obtenido correctamente',
          antecedente
      });
  }

  // Listar antecedentes
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de antecedentes correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarAntecedentes(@Res() res, @Query() querys) {
      const antecedentes = await this.antecedentesService.listarAntecedentes(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de antecedentes correcto',
          antecedentes
      });
  }

  // Listar antecedentes por ficha
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de antecedentes correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/ficha/:id')
  async listadoAntecedentesPorFicha(@Res() res, @Query() querys, @Param('id') fichaId) {
      const antecedentes = await this.antecedentesService.listarAntecedentesPorFicha(fichaId, querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de antecedentes correcta',
          antecedentes
      });
  }

  // Crear antecedente
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Antecedente creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: AntecedenteDTO })
  @Post('/')
  async crearAntecedente(@Res() res, @Body() antecedenteDTO: AntecedenteDTO ) {
      const antecedente = await this.antecedentesService.crearAntecedente(antecedenteDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Antecedente creado correctamente',
          antecedente
      });
  }
    
  // Actualizar antecedente
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Antecedente actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de antecedente', type: 'string'})
  @Put('/:id')
  async actualizarAntecedente(@Res() res, @Body() antecedenteUpdateDTO: AntecedenteUpdateDTO, @Param('id') antecedenteID ) {
      
      const antecedente = await this.antecedentesService.actualizarAntecedente(antecedenteID, antecedenteUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Antecedente actualizado correctamente',
          antecedente
      });

  }

}
