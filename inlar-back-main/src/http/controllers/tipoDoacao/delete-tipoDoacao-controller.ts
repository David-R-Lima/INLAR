import {
    Controller,
    HttpCode,
    Param,
    Get,
    NotFoundException,
    BadRequestException,
    Delete,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
    import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
    import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { DeleteTipoDoacaoById } from 'src/inlar/actions/tipo-doacao/delete-tipo-doacao';
  const squema = z.object({
    id_tipoDoacao: z.coerce.number(),
  });
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  @Controller('/tipoDoacao/:id_tipoDoacao')
  export class DeleteTipoDoacaooByIdController {
    constructor(private deleteTipoDoacaoById: DeleteTipoDoacaoById) {}
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {

      const res = await this.deleteTipoDoacaoById.execute({
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