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
  import { DeleteDoadorById } from 'src/inlar/actions/doador/delete-doador';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    id_doador: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doador/:id_doador')
  export class DeleteDoadorByIdController {
    constructor(private deleteDoadorById: DeleteDoadorById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.deleteDoadorById.execute({
        idDoador: param.id_doador,
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
  