import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('dropdownZone') dorpdownZone: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  title = 'Du Fait Maison';
  isLogged = false;
  displayBanner: boolean = true;
  username = '';


  isDisabled = true;

  constructor(
    private ts: TokenStorageService,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.auth.isLogged$.pipe(takeUntil(this.destroy$)).subscribe(
      isLogged => {
        const user = this.ts.getUser();
        this.isLogged = isLogged;
      });
    this.userService.username$.pipe(takeUntil(this.destroy$))
      .subscribe(username => {
        if (username) {
          this.username = username;
        }
      });
  }
  ngOnInit(): void {
    const token = this.ts.getToken();
    if (token) {
      this.isLogged = true;
      this.username = this.ts.getUser()['username'];
    }
  }

  onClick() {
    this.isDisabled = false;
  }

  openCloseDD(event: any) {
    const element = this.dorpdownZone.nativeElement;
    element.classList.toggle('hidden');
    event.stopPropagation();
  }

  closeBanner() {
    this.displayBanner = false;
  }
  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
