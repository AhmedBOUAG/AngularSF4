import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IFilter } from '../models/interfaces/IFilter';
import { CommonUtils } from '../Utils/CommonUtils';
import { ColumnMode } from '@swimlane/ngx-datatable';

type Row = {
  SendAt: string;
  Content: string;
  To: string;
};
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  // tabType = new BehaviorSubject<string>('inbox');
  @Input() data: any;
  @ViewChild('received') received: any;
  @ViewChild('sended') sended: any;

  nbSendedMessages: number = 0;
  sendedMessages: any;
  receivedMessages: any;
  nbInboxMessages: number = 0;
  rows: Row[] = [];
  type: string = 'inbox';
  totalItems: number = 0;
  messages: any;
  ColumnMode = ColumnMode;
  emptyMessage = 'Aucun message envoyé';
  nbItemPerPage = CommonUtils.NB_ITEM_PER_PAGE;
  filter: IFilter = {};
  constructor() { }

  ngOnInit(): void {
    console.log('in messages')
  }
  calculateNbMessages(nbMessages: number[]) {
    this.nbSendedMessages = nbMessages[1];
  }
  calculateNbInboxMessages(nbMessages: number[]) {
    this.nbInboxMessages = nbMessages[0];
  }
}
