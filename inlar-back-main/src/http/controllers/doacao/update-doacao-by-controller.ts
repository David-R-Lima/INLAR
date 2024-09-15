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

  import { UpdateDoacao } from 'src/inlar/actions/doacao/update-doacao';
import { Doacao } from 'src/inlar/entities/doacao';
import { NotFoundError } from 'rxjs';
import { InternalError } from 'src/inlar/errors/internal-error';

  const squema = z.object({
    id_doador: z.coerce.number().optional(),
    id_beneficiario: z.coerce.number().optional(),
    id_usuario: z.coerce.number(),
    descricao: z.string({
      required_error: 'Field: {nome} is required',
    }),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
    observacoes: z.string().optional(),
    itens: z.array(
        z.object({
          tipo: z.coerce.number({
            required_error: 'Field: {tipo} is required',
          }),
          numItens: z.number().optional(),
          quantidade: z.number().optional(),
          valor: z.number().optional(),
          descricao: z.string().optional(),
        })
      ).min(1, {
        message: 'At least one item is required',
      }),
  });

  type Schema = z.infer<typeof squema>;

  const validationPipe = new ZodValidationPipe(squema);

  const squemaParam = z.object({
    id_doacao: z.coerce.number(),
  });

  type SchemaParam = z.infer<typeof squemaParam>;

  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  @Controller('/doacao/:id_doacao')
  export class UpdateDoacaoController {
    constructor(private updateDoacao: UpdateDoacao) {}
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const res = await this.updateDoacao.execute({
        id: param.id_doacao,
        id_doador: param.id_doador,
        id_beneficiario: param.id_beneficiario,
        id_usuario: param.id_usuario,
        cep: body.cep,
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidade: body.cidade,
        uf: body.uf,
        itens: body.itens,
        numItens: body.numItens,
        quantidade: body.quantidade,
        valor: body.valor,
        descricao: body.descricao,
        situacao: body.situacao
      });

      if (res instanceof Doacao) {
        return res;
      }

      if(res instanceof NotFoundError) {
       throw new NotFoundException(res.message);
     }
 
     if(res instanceof InternalError) {
       throw new BadRequestException("Internal Error");
     }
     
      throw new BadRequestException;
    }
  }
 