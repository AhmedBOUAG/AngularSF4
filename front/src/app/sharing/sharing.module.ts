import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BreadcrumbComponent,
    ToastComponent
  ],
  exports: [
    BreadcrumbComponent,
    ToastComponent,
    NgSelectModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule,
    ToastModule,
    NgSelectModule
  ]
})
export class SharingModule { }
