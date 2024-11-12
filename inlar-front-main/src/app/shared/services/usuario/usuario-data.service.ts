import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/interfaces/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: Usuario | undefined;

  setUserData(data: Usuario): void {
    this.userData = data;
  }

  getUserData(): Usuario | undefined {
    return this.userData;
  }
}
