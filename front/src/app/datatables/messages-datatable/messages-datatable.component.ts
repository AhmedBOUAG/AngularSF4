import { catchError, map, filter } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { MessageService } from 'src/app/services/message.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AbstractDatatable } from '../abstractDatatable';
import { IPaginate } from 'src/app/models/interfaces/IPaginate';
import { IFilter } from 'src/app/models/interfaces/IFilter';
type Row = {
  SendAt: string;
  Content: string;
  To: string;
};
@Component({
  selector: 'app-messages-datatable',
  templateUrl: './messages-datatable.component.html',
  styleUrls: ['./messages-datatable.component.css']
})

export class MessagesDatatableComponent extends AbstractDatatable implements OnInit {
  @ViewChild('table') table: DatatableComponent;
  messages: any;
  ColumnMode = ColumnMode;
  totalItems: number = 0;
  emptyMessage = 'Aucun message envoyé';
  nbItemPerPage = CommonUtils.NB_ITEM_PER_PAGE;
  filter: IFilter = {};

  constructor(private messageService: MessageService) {
    super();
  }
  columns = [{ prop: 'To', width: 50 }, { name: 'Content' }, { name: 'SendAt', width: 100 }];

  ngOnInit(): void {
    this.getData();
  }

  protected getData(filter: IFilter = {}, operationType = 'undefined'): any {
    filter = this.checkPaginator(filter);
    this.messageService.getSendedMessages(filter)
      .pipe(
        catchError((err: any) => {
          console.error(err);
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
    return messages[CommonUtils.RESPONSE_ARRAY_KEY].map((message: any) => ({
      To: message.recipient.username,
      Content: message.content,
      SendAt: new Date(message.createdAt).toLocaleDateString() + ' ' + new Date(message.createdAt).toLocaleTimeString()
    }));
  }

  private checkPaginator(filter: IFilter): IFilter {
    if (filter.paginator === undefined) {
      return this.initPaginator();
    }
    return filter;
  }

  private initPaginator(): IFilter {
    this.filter.paginator = { page: 0, first: 0, rows: this.nbItemPerPage } as IPaginate;
    return this.filter;
  }
  onPageChange(event: IPaginate | any) {
    this.nbItemPerPage = event.rows;
    this.filter.paginator = event;
    this.getData(this.filter);
  }

  onSort(event: any) {
    this.filter.order = event.sorts[0].dir.toUpperCase();
    this.filter.orderBy = event.sorts[0].prop;
    this.getData(this.filter);
  }
}
