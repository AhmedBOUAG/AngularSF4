import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = new BehaviorSubject<boolean>(false);

  isLogged$ = this.isLogged.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    console.log(email, password);
    return this.http.post<any>(`${environment.apiBaseUrl}api/login_check`, { email, password })
      .pipe(
        map(token => {
          console.log('in http');
          this.isLogged.next(true);
          return token;
        })
      );
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.isLogged.next(false);
    this.router.navigate(['login']);
  }
}
