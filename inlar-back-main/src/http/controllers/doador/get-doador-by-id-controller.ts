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
import { GetDoadorById } from 'src/inlar/actions/doador/get-doador-by-id';
import { Doador } from 'src/inlar/entities/doador';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

const squema = z.object({
  id_doador: z.coerce.number(),
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

@Controller('/doador/:id_doador')
export class GetDoadorByIdController {
  constructor(private getDoadorById: GetDoadorById) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(validationPipe)
    param: Schema,
  ) {
    const res = await this.getDoadorById.execute({
      idDoador: param.id_doador,
    });

    if (res instanceof Doador) {
      return res;
    }

    if(res instanceof NotFoundError) {
      throw new NotFoundException(res.message)
    }

    throw new BadRequestException();
  }
}
