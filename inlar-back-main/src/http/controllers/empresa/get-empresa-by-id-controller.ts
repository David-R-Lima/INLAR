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
  import { GetEmpresaById } from 'src/inlar/actions/empresa/get-empresa-by-id';
import { Empresa } from 'src/inlar/entities/empresa';
  
  const squema = z.object({
    id_empresa: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa/:id_empresa')
  export class GetEmpresaByIdController {
    constructor(private getEmpresaById: GetEmpresaById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const res = await this.getEmpresaById.execute({
        idEmpresa: param.id_empresa,
      });
  
      if (res instanceof Empresa) {
        return res;
      }

      if(res instanceof NotFoundException) {
        throw new NotFoundException(res.message)
      }
  
      throw new BadRequestException();
    }
  }
  