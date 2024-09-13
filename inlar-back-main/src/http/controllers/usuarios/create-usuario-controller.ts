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
import { CreateUsuario } from 'src/inlar/actions/usuarios/create-usuario';
import { Usuario } from 'src/inlar/entities/usuario';
import { AlreadyExistsError } from 'src/inlar/errors/already-exists-error';
import { InternalError } from 'src/inlar/errors/internal-error';
import { Public } from 'src/http/auth/public';

const squema = z.object({
  usuario: z.string(),
  email: z.string().email(),
  senha: z.string(),
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

// @Public()
@Controller('/usuarios')
export class CreateUsuarioController {
  constructor(private createUsuario: CreateUsuario) {}

  @Post()  
  @HttpCode(201)
  async handle(
    @Body(validationPipe)
    body: Schema,
  ) {
    const res = await this.createUsuario.execute({
      email: body.email,
      senha: body.senha,
      usuario: body.usuario,
    });

    if (res instanceof Usuario) {
      return res;
    }

    if (res instanceof AlreadyExistsError) {
      throw new ConflictException(res.message);
    }

    if (res instanceof InternalError) {
      throw new BadRequestException("Internal error");
    }

    throw new BadRequestException();
  }
}
