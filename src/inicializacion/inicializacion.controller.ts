import { Body, Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { InicializacionService } from './inicializacion.service';

@ApiTags('Inicializacion')
@Controller('inicializacion')
export class InicializacionController {

    constructor(private inicializacionService: InicializacionService){}

    // Inicializacion de usuarios
    @ApiOkResponse({ description: 'Usuarios inicializados correctamente' })
    @Get('/usuarios')
    async initUsuarios(@Res() res){
        await this.inicializacionService.initUsuarios();
        res.status(HttpStatus.OK).json({
            message: 'Inicializacion de usuarios completado correctamente'
        })
    } 

    // Importacion de fichas - Archivo excel (.xlsx)
    @ApiOkResponse({ description: 'Fichas importadas correctamente' })
    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: diskStorage({
                    destination: './importar',
                    filename: function(req, file, cb){
                        cb(null, 'fichas.xlsx')
                    }
                })
            }
        )
    )
    @Post('/fichas')
    async importarFichas(@UploadedFile() file: Express.Multer.File, @Query() query: any) {
        
        const msg = await this.inicializacionService.importarFichas(query);

        return {
            msg
        }

    }

    // Importacion de medicamentos - Archivo excel (.xlsx)
    @ApiOkResponse({ description: 'Medicamentos importados correctamente' })
    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: diskStorage({
                    destination: './importar',
                    filename: function(req, file, cb){
                        cb(null, 'medicamentos.xlsx')
                    }
                })
            }
        )
    )
    @Post('/medicamentos')
    async importarMedicamentos(@UploadedFile() file: Express.Multer.File, @Query() query: any) {
        
        const msg = await this.inicializacionService.importarMedicamentos(query);

        return {
            msg
        }

    }

}
