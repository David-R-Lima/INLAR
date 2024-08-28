import {
    Controller,
    Body,
    HttpCode,
    NotFoundException,
    Post,
    BadRequestException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { AuthenticateUser } from 'src/inlar/actions/usuarios/authenticate-user';
import { Usuario } from 'src/inlar/entities/usuario';
import { AlreadyExistsError } from 'src/inlar/errors/already-exists-error';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
  
  const squema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/authenticate')
  export class AuthenticateUserController {
    constructor(private authenticateUser: AuthenticateUser) {}
  
    @Post()
    @HttpCode(200)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {
      const res = await this.authenticateUser.execute({
        email: body.email,
        senha: body.senha,
      });
  
      if (res instanceof Usuario) {
        return res;
      }
  
      if (res instanceof NotFoundError) {
        throw new NotFoundException("Usuario not found");
      }
  
      throw new NotFoundException();
    }
  }
  