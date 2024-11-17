import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap, tap } from 'rxjs';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';
import { Usuario } from 'src/app/models/interfaces/user/user';
import { UserDataService } from 'src/app/shared/services/usuario/usuario-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService,   private userDataService: UserDataService) {}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/usuarios`,
      requestDatas
    );
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/authenticate`, requestDatas).pipe(
      tap((response) => {
        // Save the JWT token in the cookie
        this.cookie.set('USER_INFO', response.access_token);
      }),
      switchMap(() => this.fetchUserData()) // Fetch user data after storing JWT
    );
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

  fetchUserData(): Observable<any> {
    console.log("ewntrei")
    return this.http.get<{usuario: Usuario}>(`${this.API_URL}/usuario`).pipe(
      tap((data) => {
        // Store user data in the shared service
        this.userDataService.setUserData(data.usuario);
        console.log(this.userDataService.getUserData())
      })       
    );
  }
  
}
