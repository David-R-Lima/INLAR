import {
    Controller,
    Post,
    Body,
    HttpCode,
    BadRequestException,
    ConflictException,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { CreateEmpresa } from 'src/inlar/actions/empresa/create-empresa';
import { Empresa } from 'src/inlar/entities/empresa';
import { AlreadyExistsError } from 'src/inlar/errors/already-exists-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    nome_fantasia: z.string({
      required_error: 'Field: {nomefantasia} is required',
    }),
    razao_social: z.string().optional(),
    cnpj: z
      .string()
      .max(14, { message: 'Cannot exceed 14 caracters' })
      .optional(),
    contato1: z
      .string()
      .max(11, { message: 'Cannot exceed 11 caracters' })
      .optional(),
    contato2: z
      .string()
      .max(11, { message: 'Cannot exceed 11 caracters' })
      .optional(),
    cep: z.string().max(8, { message: 'Cannot exceed 8 caracters' }).optional(),
    logradouro: z
      .string()
      .max(255, { message: 'Cannot exceed 255 caracters' })
      .optional(),
    numero: z
      .string()
      .max(10, { message: 'Cannot exceed 10 caracters' })
      .optional(),
    complemento: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional(),
    bairro: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional(),
    cidade: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional(),
    uf: z.string().max(2, { message: 'Cannot exceed 2 caracters' }).optional(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa')
  export class CreateEmpresaController {
    constructor(private createEmpresa: CreateEmpresa) {}
  
    @Post()
    @HttpCode(201)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {
      const res = await this.createEmpresa.execute({
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

      if(res instanceof AlreadyExistsError) {
        throw new ConflictException(res.message)
      }

      if (res instanceof InternalError) {
        throw new BadRequestException("Internal error");
      }
  
      throw new BadRequestException();
    }
  }
  