import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateDoador } from 'src/inlar/actions/doador/create-doador';
import { Doador } from 'src/inlar/entities/doador';
import { InternalError } from 'src/inlar/errors/internal-error';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const squema = z.object({
  nome: z.string({
    required_error: 'Field: {nome} is required',
  }),
  tipo_pessoa: z.string({
    required_error: 'Field: {tipo_pessoa} is required',
  }),
  genero: z.string().optional(),
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

@Controller('/doador')
export class CreateDoadorController {
  constructor(private createDoador: CreateDoador) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(validationPipe)
    body: Schema,
  ) {
    const res = await this.createDoador.execute({
      nome: body.nome,
      tipoPessoa: body.tipo_pessoa,
      genero: body.genero,
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

    if(res instanceof InternalError) {
      throw new BadRequestException("Internal Error");
    }

    throw new BadRequestException();
  }
}
