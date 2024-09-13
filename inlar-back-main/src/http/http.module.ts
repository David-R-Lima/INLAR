import { Module } from '@nestjs/common';
import { CreateUsuario } from 'src/inlar/actions/usuarios/create-usuario';
import { PrismaModule } from 'src/inlar/database/prisma/prisma.module';
import { CreateUsuarioController } from './controllers/usuarios/create-usuario-controller';
import { CreateDoador } from 'src/inlar/actions/doador/create-doador';
import { GetDoadorById } from 'src/inlar/actions/doador/get-doador-by-id';
import { CreateDoadorController } from './controllers/doador/create-doador-controller';
import { GetDoadorByIdController } from './controllers/doador/get-doador-by-id-controller';
import { UpdateDoador } from 'src/inlar/actions/doador/update-doador';
import { UpdateDoadorController } from './controllers/doador/update-doador-controller';
import { GetDoadoresByPage } from 'src/inlar/actions/doador/get-doadores-by-page';
import { GetDoadoresByPageController } from './controllers/doador/get-doadores-by-page-controller';
import { DeleteDoadorById } from 'src/inlar/actions/doador/delete-doador';
import { DeleteDoadorByIdController } from './controllers/doador/delete-doador-by-id-controller';
import { CreateEmpresa } from 'src/inlar/actions/empresa/create-empresa';
import { CreateEmpresaController } from './controllers/empresa/create-empresa-controller';
import { GetEmpresaByIdController } from './controllers/empresa/get-empresa-by-id-controller';
import { GetEmpresaById } from 'src/inlar/actions/empresa/get-empresa-by-id';
import { GetEmpresaByPageController } from './controllers/empresa/get-empresa-by-page-controller';
import { GetEmpresaByPage } from 'src/inlar/actions/empresa/get-empresa-by-page';
import { UpdateEmpresa } from 'src/inlar/actions/empresa/update-empresa';
import { UpdateEmpresaController } from './controllers/empresa/update-empresa-controller';
import { DeleteEmmpresaController } from './controllers/empresa/delete-empresa-controller';
import { DeleteEmpresa } from 'src/inlar/actions/empresa/delete-empresa';
import { AuthenticateUser } from 'src/inlar/actions/usuarios/authenticate-user';
import { AuthenticateUserController } from './controllers/usuarios/authenticate-user-controller';
import { CreateDoacaoController } from './controllers/doacao/create-doacao-controller';
import { CreateDoacao } from 'src/inlar/actions/doacao/create-doacao';
import { CreateTipoDoacao } from 'src/inlar/actions/tipo-doacao/create-tipo-doacao';
import { CreatetipoDoacaoController } from './controllers/tipoDoacao/create-tipoDoacao-controller';
import { GetDoacaoById } from 'src/inlar/actions/doacao/get-doacao-by-id';
import { GetDoacaoByIdController } from './controllers/doacao/get-doacao-by-id';
import { GetDoacoesByPageController } from './controllers/doacao/get-doacoes-by-page';
import { GetDoacaoByPage } from 'src/inlar/actions/doacao/get-doacoes-by-page';
import { GetDoacaoItemById } from 'src/inlar/actions/doacao-itens/get-doacao-item-by-id';
import { GetDoacaoItemByIdController } from './controllers/doacao-itens/get-doacao-item-by id-controller';
import { GetDoacaoItemByDoacaoIdController } from './controllers/doacao-itens/get-doacoes-itens-by-doacao-id-controller';
import { GetDoacoesItensByDoacaoId } from 'src/inlar/actions/doacao-itens/get-doacoes-itens-by-doacao-id';
import { GetDoacoesItensByPageController } from './controllers/doacao-itens/get-doacoes-itens-by-page';
import { GetDoacoesItensByPage } from 'src/inlar/actions/doacao-itens/get-doacoes-itens-by-page';
import { UpdateDoacaoItem } from 'src/inlar/actions/doacao-itens/update-doacao-item';
import { UpdateDoacaoItemController } from './controllers/doacao-itens/update-doacao-item-controller';
import { GetAllTipoDoacao } from 'src/inlar/actions/tipo-doacao/get-all-tipo-doacao';
import { GetAllTipoDoacoesController } from './controllers/tipoDoacao/get-all-tipoDoacoes-controllers';
import { GetTipoDoacaoById } from 'src/inlar/actions/tipo-doacao/get-tipo-doacao-by-id';
import { UpdatetipoDoacao } from 'src/inlar/actions/tipo-doacao/update-tipo-doacao';
import { GetTipoDoacaooByIdController } from './controllers/tipoDoacao/get-tipoDoacao-by-id-controller';
import { UpdatetipoDoacaoController } from './controllers/tipoDoacao/update-tipoDoacao-controller';
import { CreateBeneficiario } from 'src/inlar/actions/beneficiario/create-beneficiario';
import { GetBeneficiariosByPage } from 'src/inlar/actions/beneficiario/get-beneficiario-by-page';
import { GetBeneficiarioById } from 'src/inlar/actions/beneficiario/get-beneficiario-by-id';
import { UpdateBeneficiario } from 'src/inlar/actions/beneficiario/update-beneficiario';
import { CreateBeneficiarioController } from './controllers/beneficiarios/create-beneficiario-controller';
import { GetBeneficiarioByIdController } from './controllers/beneficiarios/get-beneficiario-by-id-controller';
import { GetBeneficiarioByPageController } from './controllers/beneficiarios/get-beneficiario-by-page-controller';
import { UpdateBeneficiarioController } from './controllers/beneficiarios/update-beneficiario-controller';
import { DeleteBeneficiarioById } from 'src/inlar/actions/beneficiario/delete-beneficiario';
import { DeleteBeneficiarioByIdController } from './controllers/beneficiarios/delete-beneficiarios-by-controller';
import { DeleteDoacaoById } from 'src/inlar/actions/doacao/delete-doacao';
import { DeleteDoacaoByIdController } from './controllers/doacao/delete-doacao-by-controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUsuario,
    CreateDoador,
    GetDoadorById,
    UpdateDoador,
    GetDoadoresByPage,
    DeleteDoadorById,
    CreateEmpresa,
    GetEmpresaById,
    GetEmpresaByPage,
    UpdateEmpresa,
    DeleteEmpresa,
    AuthenticateUser,
    CreateDoacao,
    CreateTipoDoacao,
    GetDoacaoById,
    GetDoacaoByPage,
    GetDoacaoItemById,
    GetDoacoesItensByDoacaoId,
    GetDoacoesItensByPage,
    UpdateDoacaoItem,
    GetAllTipoDoacao,
    GetTipoDoacaoById,
    UpdatetipoDoacao,
    CreateBeneficiario,
    GetBeneficiariosByPage,
    GetBeneficiarioById,
    UpdateBeneficiario,
    DeleteBeneficiarioById,
    DeleteDoacaoById
  ],
  controllers: [
    CreateUsuarioController,
    CreateDoadorController,
    GetDoadorByIdController,
    UpdateDoadorController,
    GetDoadoresByPageController,
    DeleteDoadorByIdController,
    CreateEmpresaController,
    GetEmpresaByIdController,
    GetEmpresaByPageController,
    UpdateEmpresaController,
    DeleteEmmpresaController,
    AuthenticateUserController,
    CreateDoacaoController,
    CreatetipoDoacaoController,
    GetDoacaoByIdController,
    GetDoacoesByPageController,
    GetDoacaoItemByIdController,
    GetDoacaoItemByDoacaoIdController,
    GetDoacoesItensByPageController,
    UpdateDoacaoItemController,
    GetAllTipoDoacoesController,
    GetTipoDoacaooByIdController,
    UpdatetipoDoacaoController,
    CreateBeneficiarioController,
    GetBeneficiarioByIdController,
    GetBeneficiarioByPageController,
    UpdateBeneficiarioController,
    DeleteBeneficiarioByIdController,
    DeleteDoacaoByIdController
  ],
})
export class HttpModule {}
