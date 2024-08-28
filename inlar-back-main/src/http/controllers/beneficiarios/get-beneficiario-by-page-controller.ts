 import {
     Controller,
     HttpCode,
     BadRequestException,
     Get,
     Query,
   } from '@nestjs/common';
   import { z } from 'zod';
   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
   import { GetBeneficiariosByPage } from 'src/inlar/actions/beneficiario/get-beneficiario-by-page';

   const squema = z.object({
     page: z.coerce.number(),
   });

   type Schema = z.infer<typeof squema>;

   const validationPipe = new ZodValidationPipe(squema);
   @Controller('/beneficiario')
   export class GetBeneficiarioByPageController {
     constructor(private getBeneficiariosByPage: GetBeneficiariosByPage) {}
     @Get()
     @HttpCode(200)
     async handle(
       @Query(validationPipe)
       query: Schema,
     ) {

       const beneficiario = await this.getBeneficiariosByPage.execute({
         page: query.page,
       });
       
       return beneficiario
     }
   }
  