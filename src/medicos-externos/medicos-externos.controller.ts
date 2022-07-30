import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MedicosExternosUpdateDTO } from './dto/medicos-externos-update.dto';
import { MedicosExternosDTO } from './dto/medicos-externos.dto';
import { MedicosExternosService } from './medicos-externos.service';

@ApiTags('Medicos externos')
@Controller('medicos-externos')
export class MedicosExternosController {
    constructor( private medicosExternosService: MedicosExternosService ){}

    // Medico externo por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Medico obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de medico', type: 'string'})
    @Get('/:id')
    async getMedico(@Res() res, @Param('id') medicoID) {
        const medico = await this.medicosExternosService.getMedico(medicoID);
        res.status(HttpStatus.OK).json({
            message: 'Medico obtenido correctamente',
            medico
        });
    }

    // Listar medicos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de medicos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarMedicos(@Res() res, @Query() querys) {
        const medicos = await this.medicosExternosService.listarMedicos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de medicos correcto',
            medicos
        });
    }

    // Crear medico
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Medico creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: MedicosExternosDTO })
    @Post('/')
    async crearMedico(@Res() res, @Body() medicosExternosDTO: MedicosExternosDTO ) {

        // Se crea un nuevo medico externo
        const medico = await this.medicosExternosService.crearMedico(medicosExternosDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Medico creado correctamente',
            medico
        });
    
    }
        
    // Actualizar medico
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Medico actualizado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de medico', type: 'string'})
    @Put('/:id')
    async actualizarMedico(@Res() res, @Body() medicosExternosUpdateDTO: MedicosExternosUpdateDTO, @Param('id') medicoID ) {
        
        const medico = await this.medicosExternosService.actualizarMedico(medicoID, medicosExternosUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Medico actualizada correctamente',
            medico
        });

    }

}
