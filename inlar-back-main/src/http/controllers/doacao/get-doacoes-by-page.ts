import {
    Controller,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoacaoByPage } from 'src/inlar/actions/doacao/get-doacoes-by-page';
  
  const squema = z.object({
    page: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacao')
  export class GetDoacoesByPageController {
    constructor(private getDoacaoByPage: GetDoacaoByPage) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Query(validationPipe)
      query: Schema,
    ) {
      const empresa = await this.getDoacaoByPage.execute({
        page: query.page,
      });
  
      return empresa
    }
  }
  