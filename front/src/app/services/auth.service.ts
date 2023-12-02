import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = new BehaviorSubject<boolean>(false);
  private sessionExpired = new BehaviorSubject<boolean>(false);
  baseUrl = environment.apiBaseUrl + 'api';

  isLogged$ = this.isLogged.asObservable();
  sessionExpired$ = this.sessionExpired.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login_check`, { email, password })
      .pipe(
        map(token => {
          this.isLogged.next(true);
          return token;
        })
      );
  }


  isAuthenticated(): Observable<any> {
    const uri = `${this.baseUrl}/user/status`;
    return this.http.get<any>(uri).pipe(
      map((isAutenticate: any) => {
        return isAutenticate;
      }),
      catchError((err) => {
        return of(false);
      })
    );

  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.isLogged.next(false);
    this.router.navigate(['login']);
  }
  expired() {
    this.sessionExpired.next(true);
  }
}
