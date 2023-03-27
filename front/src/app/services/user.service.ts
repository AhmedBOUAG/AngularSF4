import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username = new Subject<string>();
  username$ = this.username.asObservable();

  currentUser = environment.apiBaseUrl + 'api/user/current_user';
  constructor(private http: HttpClient) { }

  getClaimsCurrentUser()
  {
    return this.http.get<any>(this.currentUser).pipe(
      map((user: any) => {
        this.username.next(user.username);
        return user;
      }));
  }
}
