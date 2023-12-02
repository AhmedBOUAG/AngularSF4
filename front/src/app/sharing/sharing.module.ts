import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterComponent } from './filter/filter.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BreadcrumbComponent,
    ToastComponent,
    FilterComponent,
    ContactComponent,
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
    NgSelectModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule
  ]
})
export class SharingModule { }
