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
import { UpdateDoador } from 'src/inlar/actions/doador/update-doador';
import { Doador } from 'src/inlar/entities/doador';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
import { cnpj, cpf } from 'cpf-cnpj-validator';

const squema = z.object({
  nome: z.string().optional(),
  tipo_pessoa: z.string().optional(),
  cpf: z.string().max(11, { message: 'Cannot exceed 11 caracters' }).refine((value) => {
    if(!value) return true
    if (cpf.isValid(value)) return true

    return false
  }, {
    message: "Invalid cpf"
  }).optional(), 
  cnpj: z
    .string()
    .max(14, { message: 'Cannot exceed 14 caracters' })
    .refine((value) => {
      if(!value) return true
      if (cnpj.isValid(value)) return true
  
      return false
    }, {
      message: "Invalid cnpj"
    }).optional(), 
  contato1: z.string().optional(),
  contato2: z.string().optional(),
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  observacoes: z.string().optional(),
}).superRefine((data, ctx) => {
  if(!data.cnpj && !data.cpf) {
    throw ctx.addIssue({
      code: 'custom',
      message: "Must have cpf or cnpj"
    })
  }
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

const squemaParam = z.object({
  id_doador: z.coerce.number(),
});

type SchemaParam = z.infer<typeof squemaParam>;
const paramValidationPipe = new ZodValidationPipe(squemaParam);

@Controller('/doador/:id_doador')
export class UpdateDoadorController {
  constructor(private updateDoador: UpdateDoador) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe)
    param: SchemaParam,
    @Body(validationPipe)
    body: Schema,
  ) {
    const res = await this.updateDoador.execute({
      idDoador: param.id_doador,
      nome: body.nome,
      tipoPessoa: body.tipo_pessoa,
      cpf: body.cpf,
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
      observacoes: body.observacoes,
    });

    if (res instanceof Doador) {
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
