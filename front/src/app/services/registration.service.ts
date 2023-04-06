import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserRegistration } from '../registration/registration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private createUser = environment.apiBaseUrl + 'api/user/create';
  user!: UserRegistration[];

  constructor(private http: HttpClient) { }

  registration(userReg: UserRegistration): Observable<UserRegistration[]> {
    return this.http.post(`${this.createUser}`, userReg).pipe(
      map((res) => {
        return this.user;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * la gestion d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    let error_description = error.error['violations'][0]['message'] !== 'undefined' ? error.error['violations'][0]['message'] : error.error;

    return throwError(error_description);
  }

}
