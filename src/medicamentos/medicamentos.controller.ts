import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MedicamentosUpdateDTO } from './dto/medicamentos-update';
import { MedicamentosDTO } from './dto/medicamentos.dto';
import { MedicamentosService } from './medicamentos.service';


@ApiTags('Medicamentos')
@Controller('Medicamentos')
export class MedicamentosController {

  constructor( private medicamentosService: MedicamentosService ){}

  // Medicamento por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Medicamento obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de medicamento', type: 'string'})
  @Get('/:id')
  async getMedicamentos(@Res() res, @Param('id') medicamentoID) {
      const medicamento = await this.medicamentosService.getMedicamento(medicamentoID);
      res.status(HttpStatus.OK).json({
          message: 'Medicamento obtenido correctamente',
          medicamento
      });
  }

  // Listar medicamentos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de medicamentos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarMedicamentos(@Res() res, @Query() querys) {
      const { medicamentos, totalItems } = await this.medicamentosService.listarMedicamentos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de medicamentos correcto',
          medicamentos,
          totalItems
      });
  }

  // Crear medicamentos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Medicamento creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: MedicamentosDTO })
  @Post('/')
  async crearMedicamentos(@Res() res, @Body() medicamentosDTO: MedicamentosDTO ) {
      const medicamento = await this.medicamentosService.crearMedicamento(medicamentosDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Medicamentos creado correctamente',
          medicamento
      });
  }
    
  // Actualizar medicamento
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Medicamento actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de medicamento', type: 'string'})
  @Put('/:id')
  async actualizarMedicamento(@Res() res, @Body() medicamentoUpdateDTO: MedicamentosUpdateDTO, @Param('id') medicamentoID ) {
      
      const medicamento = await this.medicamentosService.actualizarMedicamento(medicamentoID, medicamentoUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Medicamento actualizado correctamente',
          medicamento
      });

  }

}
