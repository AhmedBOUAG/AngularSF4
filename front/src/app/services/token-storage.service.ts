import { Injectable } from '@angular/core';
import { CommonUtils } from '../Utils/CommonUtils';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(CommonUtils.KEY_AUTH_TOKEN);
    localStorage.setItem(CommonUtils.KEY_AUTH_TOKEN, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(CommonUtils.KEY_AUTH_TOKEN);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER);
    localStorage.setItem(CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
