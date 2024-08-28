 import {
     Controller,
     HttpCode,
     Param,
     Get,
     NotFoundException,
     BadRequestException,
   } from '@nestjs/common';
   import { z } from 'zod';
   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
   import { GetTipoDoacaoById } from 'src/inlar/actions/tipo-doacao/get-tipo-doacao-by-id';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
   const squema = z.object({
     id_tipoDoacao: z.coerce.number(),
   });
   type Schema = z.infer<typeof squema>;
   const validationPipe = new ZodValidationPipe(squema);
   @Controller('/tipoDoacao/:id_tipoDoacao')
   export class GetTipoDoacaooByIdController {
     constructor(private getTipoDoacaoById: GetTipoDoacaoById) {}
     @Get()
     @HttpCode(200)
     async handle(
       @Param(validationPipe)
       param: Schema,
     ) {

       const res = await this.getTipoDoacaoById.execute({
         id: param.id_tipoDoacao,
       });

       if (res instanceof TipoDoacao) {
         return res;
       }

       if(res instanceof NotFoundError) {
         throw new NotFoundException(res.message)
       }

       throw new BadRequestException();
     }
   }