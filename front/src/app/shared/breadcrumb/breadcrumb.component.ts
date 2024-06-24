import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  home: MenuItem;
  @Input() items: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
