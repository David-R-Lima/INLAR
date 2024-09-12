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
  import { DeleteDoacaoById } from 'src/inlar/actions/doacao/delete-doacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    id_doacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacao/:id_doacao')
  export class DeleteDoacaoByIdController {
    constructor(private deleteDoacaoById: DeleteDoacaoById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.deleteDoacaoById.execute({
        idDoacao: param.id_doacao,
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
  