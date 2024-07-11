import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { slideInAnimation } from './animations';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'duFaitMaison';
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
