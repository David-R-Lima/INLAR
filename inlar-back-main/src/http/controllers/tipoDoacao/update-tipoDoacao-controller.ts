 import {
     Controller,
     Body,
     HttpCode,
     BadRequestException,
     Put,
     Param,
     NotFoundException,
   } from '@nestjs/common';
   import { z } from 'zod';
   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
   import { UpdatetipoDoacao } from 'src/inlar/actions/tipo-doacao/update-tipo-doacao';
import { NotFoundError } from 'rxjs';
import { InternalError } from 'src/inlar/errors/internal-error';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
   
   const squema = z.object({
     descricao: z.string().optional(),
     ativo: z.boolean().optional(),
   });

   type Schema = z.infer<typeof squema>;

   const validationPipe = new ZodValidationPipe(squema);

   const squemaParam = z.object({
     id_tipoDoacao: z.coerce.number(),
   });

   type SchemaParam = z.infer<typeof squemaParam>;
   const paramValidationPipe = new ZodValidationPipe(squemaParam);
   @Controller('/tipoDoacao/:id_tipoDoacao')
   export class UpdatetipoDoacaoController {
     constructor(private updatetipoDoacao: UpdatetipoDoacao) {}
     @Put()
     @HttpCode(200)
     async handle(
       @Param(paramValidationPipe)
       param: SchemaParam,
       @Body(validationPipe)
       body: Schema,
     ) {
       const res = await this.updatetipoDoacao.execute({
         id: param.id_tipoDoacao,
         descricao: body.descricao,
         ativo: body.ativo,
       });

       if (res instanceof TipoDoacao) {
         return res;
       }

       if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message);
      }
  
      if(res instanceof InternalError) {
        throw new BadRequestException("Internal Error");
      }
      
       throw new BadRequestException;
     }
   }
  