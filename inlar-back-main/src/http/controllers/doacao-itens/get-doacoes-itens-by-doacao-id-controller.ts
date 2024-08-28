import {
    Controller,
    HttpCode,
    Param,
    Get,
    NotFoundException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoacoesItensByDoacaoId } from 'src/inlar/actions/doacao-itens/get-doacoes-itens-by-doacao-id';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
  
  const squema = z.object({
    id_doacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItem/doacao/:id_doacao')
  export class GetDoacaoItemByDoacaoIdController {
    constructor(
        private getDoacoesItensByDoacaoId: GetDoacoesItensByDoacaoId,
    ) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.getDoacoesItensByDoacaoId.execute({
        idDoacao: param.id_doacao,
      });
  
      if (res instanceof NotFoundError) {
        throw new NotFoundException(res.message)
      }
  
      return res
    }
  }
  