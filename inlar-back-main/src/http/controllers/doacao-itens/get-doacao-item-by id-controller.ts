import {
    Controller,
    HttpCode,
    Param,
    Get,
    NotFoundException,
    BadGatewayException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoacaoItemById } from 'src/inlar/actions/doacao-itens/get-doacao-item-by-id';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
  
  const squema = z.object({
    id_doacao_item: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItem/:id_doacao_item')
  export class GetDoacaoItemByIdController {
    constructor(private getDoacaoItemById: GetDoacaoItemById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.getDoacaoItemById.execute({
        id: param.id_doacao_item,
      });
  
      if (res instanceof DoacaoItem) {
        return res;
      }

      if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message)
      }
  
      throw new BadGatewayException();
    }
  }
  