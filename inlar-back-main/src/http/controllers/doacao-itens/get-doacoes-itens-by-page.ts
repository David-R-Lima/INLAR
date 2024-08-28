import {
    Controller,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { GetDoadoresByPage } from 'src/inlar/actions/doador/get-doadores-by-page';
import { GetDoacoesItensByPage } from 'src/inlar/actions/doacao-itens/get-doacoes-itens-by-page';
  
  const squema = z.object({
    page: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItem')
  export class GetDoacoesItensByPageController {
    constructor(private getDoacoesItensByPage: GetDoacoesItensByPage) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Query(validationPipe)
      query: Schema,
    ) {
      const doador = await this.getDoacoesItensByPage.execute({
        page: query.page,
      });
  
      return doador
    }
  }
  