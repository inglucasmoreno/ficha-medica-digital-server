import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Winston - LOG
import { WinstonModule } from 'nest-winston';
import * as  winston from 'winston';

// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    
    // Logger con winstone
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({
          maxsize: 512000,
          maxFiles: 5,
          filename: `${__dirname}/../logs/log-api.log`,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.align(),
            winston.format.simple(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),        
          )
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.simple(),
            winston.format.colorize({ all: true }),
            winston.format.align(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
            // nestWinstonModuleUtilities.format.nestLike('Equinoccio', { prettyPrint: true })
          )
        })
      ]
    })
  });
  
  // Configuracion de CORS
  app.enableCors();

  // PIPES para validacion
  app.useGlobalPipes(new ValidationPipe());
  
  // Swagger
  const options = new DocumentBuilder()
  .setTitle('Equinoccio Template')
  .setDescription('Template desarrollado por Equinoccio Technology para sus proyectos')
  .setVersion('1.0')
  .addTag('Template')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
  .build()

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true
    }
  });

  // Inicio de servidor
  await app.listen(3000);

}

bootstrap();
