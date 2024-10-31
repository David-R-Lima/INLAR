import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  
  {
     path: '',
     redirectTo: 'dashboard',
     pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'beneficiario',
    loadChildren: () =>
      import('./modules/beneficiario/beneficiario.module').then(
        (m) => m.BeneficiarioModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'doador',
    loadChildren: () =>
      import('./modules/doador/doador.module').then(
        (m) => m.DoadorModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'doacao',
    loadChildren: () =>
      import('./modules/doacao/doacao.module').then(
        (m) => m.DoacaoModule
      ),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
