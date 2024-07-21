import { catchError, map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonUtils } from '../../Utils/CommonUtils';
import { MessageService } from '../../services/message.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AbstractDatatable } from '../abstractDatatable';
import { IFilter } from '../../models/interfaces/IFilter';
import { filterAnimation } from '../../shared/animations/datatable.animation';
import { RouterService } from '../../services/router.service';
type Row = {
  id: string;
  createdAt: string;
  content: string;
  to?: string;
  from?: string;
};
@Component({
  selector: 'app-messages-datatable',
  standalone: true,
  imports: [],
  templateUrl: './messages-datatable.component.html',
  styleUrls: ['./messages-datatable.component.css'],
  animations: [filterAnimation]
})

export class MessagesDatatableComponent extends AbstractDatatable implements OnInit {
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

  constructor(
    private messageService: MessageService,
    private routerService: RouterService
  ) {
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
      id: message.id,
      to: message.recipient.username,
      content: message.content,
      from: message.sender.username,
      createdAt: new Date(message.createdAt).toLocaleDateString() + ' ' + new Date(message.createdAt).toLocaleTimeString()
    }));
  }

  accessToMessage(message: Row): void {
    this.routerService.navigateByBreadcrumb('readMessage', { id: message.id });
    //this.router.navigate(['/messages/read', message.id]);
  }
}
