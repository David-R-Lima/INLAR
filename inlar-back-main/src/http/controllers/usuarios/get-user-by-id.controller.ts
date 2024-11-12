import {
    Controller,
    Body,
    HttpCode,
    NotFoundException,
    Post,
    UnauthorizedException,
    Get,
  } from '@nestjs/common';
  import { NotFoundError } from 'src/inlar/errors/not-found-error';
  import { GetUserById } from 'src/inlar/actions/usuarios/get-user-by-id';
  import { CurrentUser } from 'src/http/auth/current-user-decorator';
  import { UserPayload } from 'src/http/auth/jwt.strategy';
  import { Usuario } from 'src/inlar/entities/usuario';
import { UsuarioPresenter } from 'src/http/presenters/usuario-presenter';
  
  
  @Controller('/usuario')
  export class GetUserByIdController {
    constructor(private getUserById: GetUserById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @CurrentUser() user: UserPayload
    ) {

      const res = await this.getUserById.execute({
        id: user.sub
      });
  
      if (res instanceof Usuario) {
        return {
          usuario: UsuarioPresenter.toHttp(res)
        };
      }
  
      if (res instanceof NotFoundError) {
        throw new NotFoundException("Usuario not found");
      }

      if (res instanceof UnauthorizedException) {
        throw new UnauthorizedException("Senha incorreta");
      }
  
      throw new NotFoundException();
    }
  }
  