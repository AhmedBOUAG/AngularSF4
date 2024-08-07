import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { AbstractFilter } from './abstractFilter';
import { IService } from '../models/interfaces/IService';


@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractFilter implements IService {
  IRI_USERS = 'api/users';
  private username = new Subject<string>();
  username$ = this.username.asObservable();

  currentUser = environment.apiBaseUrl + 'api/user/current_user';
  constructor(protected http: HttpClient) {
    super();
  }

  getClaimsCurrentUser() {
    return this.http.get<any>(this.currentUser).pipe(
      map((user: any) => {
        this.username.next(user.username);
        return user;
      }));
  }

  getHydarationIri(id: string): string {
    return `/${this.IRI_USERS}/${id}`;
  }
}
