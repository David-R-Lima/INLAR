import { Usuario } from "src/inlar/entities/usuario";

export class UsuarioPresenter {
    static toHttp(usuario: Usuario) {
        return {
            idUsuario: usuario.getIdUsuario(),
            usuario: usuario.getUsuario(),
            email: usuario.getEmail(),
            role: usuario.getRole(),
            dataCadastro: usuario.getDataCadastro(),
            ativo: usuario.getAtivo(),
        };
    }
}