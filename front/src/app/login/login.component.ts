import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { CommonUtils } from '../Utils/CommonUtils';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: UntypedFormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  isLoggedIn: boolean = false;
  expired: boolean = false
  roles: string[] = [];
  loggedInFailed: boolean = false;
  formNotifyMessage: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    /*this.auth.isLogged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(expired => {
        this.expired = expired;
      });*/

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['my-recipes']);
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loggedInFailed = false;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(this.f.email.value, this.f.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
        },
        error => {
          console.log(error);
          this.loggedInFailed = true;
          this.formNotifyMessage = error.hasOwnProperty('status') && 401 !== error.status || error !== 'Invalid credentials.' ? CommonUtils.SERVER_MESSAGE_ERROR : CommonUtils.LOGGED_IN_MESSAGE_ERROR;
          this.loading = false;
        },
        () => {
          this.getClaimsCurrentUser();
        });
  }

  getClaimsCurrentUser() {
    this.userService.getClaimsCurrentUser().pipe(first())
      .subscribe(user => {
        if (user) {
          this.tokenStorage.saveUser(user);
        }
      },
        () => { },
        () => {
          this.router.navigate(['my-recipes']);
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
