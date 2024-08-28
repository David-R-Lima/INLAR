import {
  Controller,
  HttpCode,
  Get,
  Query,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoadoresByPage } from 'src/inlar/actions/doador/get-doadores-by-page';

const squema = z.object({
  page: z.coerce.number(),
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

@Controller('/doador')
export class GetDoadoresByPageController {
  constructor(private getDoadoresByPage: GetDoadoresByPage) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query(validationPipe)
    query: Schema,
  ) {
    const doador = await this.getDoadoresByPage.execute({
      page: query.page,
    });

    return doador
  }
}
