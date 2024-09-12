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
  import { DeleteBeneficiarioById } from 'src/inlar/actions/beneficiario/delete-beneficiario';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    id_beneficiario: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/beneficiario/:id_beneficiario')
  export class DeleteBeneficiarioByIdController {
    constructor(private deleteBeneficiarioById: DeleteBeneficiarioById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.deleteBeneficiarioById.execute({
        idbeneficiario: param.id_beneficiario,
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
  