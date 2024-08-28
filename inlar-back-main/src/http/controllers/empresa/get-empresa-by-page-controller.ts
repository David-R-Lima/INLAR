import {
    Controller,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { GetEmpresaByPage } from 'src/inlar/actions/empresa/get-empresa-by-page';
  
  const squema = z.object({
    page: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa')
  export class GetEmpresaByPageController {
    constructor(private getEmpresaByPage: GetEmpresaByPage) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Query(validationPipe)
      query: Schema,
    ) {
      const empresa = await this.getEmpresaByPage.execute({
        page: query.page,
      });
  
      return empresa
    }
  }
  