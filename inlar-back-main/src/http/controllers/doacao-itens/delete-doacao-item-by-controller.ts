import {
    Controller,
    HttpCode,
    Param,
    Delete,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { DeleteDoacaoItensById } from 'src/inlar/actions/doacao-itens/delete-doacao-item';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    iditemdoacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItens/:id')
  export class DeleteDoacaoItensByIdController {
    constructor(private deleteDoacaoItensById: DeleteDoacaoItensById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.deleteDoacaoItensById.execute({
        iditemdoacao: param.iditemdoacao,
      });

      if (res instanceof NotFoundError) {
        throw new NotFoundException(res.message);
      }
  
      if(res instanceof InternalError) {
        throw new BadRequestException("Internal Error");
      }

      if(res) {
        return res
      }
      
      throw new BadRequestException();
    }
  }
  