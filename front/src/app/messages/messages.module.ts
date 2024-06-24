import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { ReadMessagesComponent } from './read-messages/read-messages.component';
import { MessagesDatatableComponent } from '../datatables/messages-datatable/messages-datatable.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';


@NgModule({
  declarations: [
    MessagesComponent,
    ReadMessagesComponent,
    MessagesDatatableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    MessagesRoutingModule
  ],
  exports: [
    ReadMessagesComponent,
    PaginatorModule
  ]
})
export class MessagesModule { }
