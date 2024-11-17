import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDataService } from '../shared/services/usuario/usuario-data.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private userService: UserService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Verifica se o usuário está logado
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }

    // Se os dados do usuário não estão no serviço, faz a requisição para obter
    if (!this.userDataService.getUserData()) {
      return this.userService.fetchUserData().pipe(
        switchMap(() => {
          // Dados do usuário foram carregados com sucesso
          return of(true); // Permite o acesso
        }),
        catchError(() => {
          // Caso haja erro ao buscar os dados do usuário, redireciona para a página inicial
          this.router.navigate(['/home']);
          return of(false); // Bloqueia o acesso
        })
      );
    }

    // Caso os dados do usuário já estejam carregados, permite o acesso
    return of(true);
  }
}
