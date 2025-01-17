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
    idDoador: z.coerce.number().optional(),
    idBeneficiario: z.coerce.number().optional(),
    idUsuario: z.coerce.number(),
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
    numItens: z.coerce.number().optional(),
    quantidade: z.coerce.number().optional(),
    valor: z.coerce.number().optional(),
    situacao: z.string().optional(),
    itens: z.array(
      z.object({
        tipo: z.coerce.number({
          required_error: 'Field: {tipo} is required',
        }),
        numItens: z.coerce.number().optional().nullable(),
        quantidade: z.coerce.number().optional().nullable(),
        valor: z.coerce.number().optional().nullable(),
        descricao: z.string().optional().nullable(),
      })
    ).min(1, {
      message: 'At least one item is required',
    }).optional(),
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
        id_doador: body.idDoador,
        id_beneficiario: body.idBeneficiario,
        id_usuario: body.idUsuario,
        cep: body.cep,
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidade: body.cidade,
        uf: body.uf,
        numItens: body.numItens,
        quantidade: body.quantidade,
        valor: body.valor,
        descricao: body.descricao,
        situacao: body.situacao,
        itens: body.itens
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
 