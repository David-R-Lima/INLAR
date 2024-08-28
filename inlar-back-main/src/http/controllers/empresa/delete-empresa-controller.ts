import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { DeleteEmpresa } from 'src/inlar/actions/empresa/delete-empresa';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    id_empresa: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa/:id_empresa')
  export class DeleteEmmpresaController {
    constructor(private deleteEmpresaById: DeleteEmpresa) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.deleteEmpresaById.execute({
        idEmpresa: param.id_empresa,
      });

      if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message)
      }

      if(res instanceof InternalError) {
        throw new BadRequestException("Internal Error")
      }
  
      if (res) {
        return res;
      }

      throw new BadRequestException();
    }
  }
  