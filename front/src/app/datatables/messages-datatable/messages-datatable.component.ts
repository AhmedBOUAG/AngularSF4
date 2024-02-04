import { catchError, map } from 'rxjs';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { MessageService } from 'src/app/services/message.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AbstractDatatable } from '../abstractDatatable';
import { IFilter } from 'src/app/models/interfaces/IFilter';
import { pageAnimations, filterAnimation } from '../datatableAnimation';

type Row = {
  SendAt: string;
  Content: string;
  To?: string;
  From?: string;
};
@Component({
  selector: 'app-messages-datatable',
  templateUrl: './messages-datatable.component.html',
  styleUrls: ['./messages-datatable.component.css'],
  animations: [pageAnimations, filterAnimation]
})

export class MessagesDatatableComponent extends AbstractDatatable implements OnInit {
  @HostBinding('@pageAnimations')
  @ViewChild('table') table: DatatableComponent;
  @Input() type: string = 'inbox';
  @Output() nbMessages = new EventEmitter<number[]>();
  messages: any;
  ColumnMode = ColumnMode;
  totalItems: number = 0;
  dataTotal = -1;
  emptyMessage = 'Aucun message';
  nbItemPerPage = CommonUtils.NB_ITEM_PER_PAGE;
  filter: IFilter = {};
  defaultSortOrder = CommonUtils.DEFAULT_ORDER_MSG;
  currentSortOrder = this.defaultSortOrder;

  constructor(private messageService: MessageService) {
    super();
  }

  ngOnInit(): void {
    this.initColumns();
    this.getData();
  }

  initColumns(): void {
    const prop = this.type === 'inbox' ? 'to' : 'from';
    const label = this.type === 'inbox' ? 'De' : 'A';
    this.columns = [
      { prop: 'createdAt', class: 'fa-sort', width: 100, label: 'Date' },
      { prop: 'content', class: 'fa-sort', label: 'Contenu' },
      { prop: prop, class: 'fa-sort', width: 50, label: label }
    ];
  }

  protected getData(filter: IFilter = {}): any {
    filter = this.checkPaginator(filter);
    this.messageService.getMessages(this.type, filter)
      .pipe(
        catchError((err: any) => {
          return [];
        }),
        map((messages: any) => this.mapMessageToRows(messages)),
      )
      .subscribe((rows: Row[]) => {
        this.rows = rows;
      });
  }

  private mapMessageToRows(messages: any): Row[] {
    this.totalItems = messages[CommonUtils.RESPONSE_TOTALITEMS_KEY];
    this.nbMessages.emit([this.totalItems, this.totalItems]);

    return messages[CommonUtils.RESPONSE_ARRAY_KEY].map((message: any) => ({
      to: message.recipient.username,
      content: message.content,
      from: message.sender.username,
      createdAt: new Date(message.createdAt).toLocaleDateString() + ' ' + new Date(message.createdAt).toLocaleTimeString()
    }));
  }

  accessToMessage(message: Row[]): void {
    console.log(message);
  }
}
