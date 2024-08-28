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
import { GetDoacaoById } from 'src/inlar/actions/doacao/get-doacao-by-id';
import { Doacao } from 'src/inlar/entities/doacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
  
  const squema = z.object({
    id_doacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacao/:id_doacao')
  export class GetDoacaoByIdController {
    constructor(private getDoacaoById: GetDoacaoById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.getDoacaoById.execute({
        idDoacao: param.id_doacao,
      });
  
      if (res instanceof Doacao) {
        return res;
      }

      if(res instanceof NotFoundError) {
        throw new NotFoundError(res.message);
      }
  
      throw new BadRequestException();
    }
  }
  