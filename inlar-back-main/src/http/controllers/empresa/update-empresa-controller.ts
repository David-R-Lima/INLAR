import {
    Controller,
    Body,
    HttpCode,
    BadRequestException,
    Put,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { UpdateEmpresa } from 'src/inlar/actions/empresa/update-empresa';
import { Empresa } from 'src/inlar/entities/empresa';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    nome_fantasia: z.string(),
    razao_social: z.string().optional(),
    cnpj: z.string().max(14, { message: 'Cannot exceed 14 caracters' }).optional(),
    contato1: z.string().optional(),
    contato2: z.string().optional(),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  const squemaParam = z.object({
    id_empresa: z.coerce.number(),
  });
  
  type SchemaParam = z.infer<typeof squemaParam>;
  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  
  @Controller('/empresa/:id_empresa')
  export class UpdateEmpresaController {
    constructor(private updateEmpresa: UpdateEmpresa) {}
  
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const res = await this.updateEmpresa.execute({
        idEmpresa: param.id_empresa,
        nomefantasia: body.nome_fantasia,
        razaosocial: body.razao_social,
        cnpj: body.cnpj,
        contato1: body.contato1,
        contato2: body.contato2,
        cep: body.cep,
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidade: body.cidade,
        uf: body.uf,
      });
  
      if (res instanceof Empresa) {
        return res;
      }

      if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message);
      }

      if(res instanceof InternalError) {
        throw new BadRequestException("Internal Error");
      }
  
      throw new BadRequestException();
    }
  }
  