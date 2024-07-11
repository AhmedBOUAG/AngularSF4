import { CommonUtils } from '../Utils/CommonUtils';
import { IFilter } from '../models/interfaces/IFilter';
import { IPaginate } from '../models/interfaces/IPaginate';
import { Page } from '../models/page';
import { IColumnTable } from '../models/interfaces/IColumnTable';

export abstract class AbstractDatatable {
    page = new Page();
    rows: any[];
    filter: IFilter = {};
    public currentPageLimit: number = 10;
    public currentVisible: number = 3;
    public readonly pageLimitOptions = [5, 10, 25, 50, 100];
    nbItemPerPage = CommonUtils.NB_ITEM_PER_PAGE;
    defaultSortOrder: string;
    currentSortColumn: string = 'createdAt';
    currentSortOrder: string;
    columns: IColumnTable[] = [];

    protected abstract getData(filter: IFilter | {}): any[];

    protected checkPaginator(filter: IFilter): IFilter {
        this.updateColumnSort();
        if (filter.paginator === undefined) {
            return this.initPaginator();
        }

        return filter;
    }

    protected initPaginator(): IFilter {
        this.filter.paginator = {
            page: 0, first: 0,
            rows: this.nbItemPerPage
        } as IPaginate;
        this.filter = {
            ...this.filter,
            order: CommonUtils.DEFAULT_ORDER_MSG,
            orderBy: CommonUtils.CREATED_AT
        };

        return this.filter;
    }
    protected onPageChange(event: IPaginate | any) {
        this.nbItemPerPage = event.rows;
        this.filter.paginator = event;
        this.getData(this.filter);
    }

    protected onSort(sort: { prop: string, dir: string }) {
        this.filter.order = sort.dir.toUpperCase();
        this.filter.orderBy = sort.prop;
        this.getData(this.filter);
    }

    sortColumn(column: string) {
        if (this.currentSortColumn === column) {
            this.currentSortOrder = this.currentSortOrder === 'ASC' ? 'DESC' : 'ASC';
        } else {
            this.currentSortColumn = column;
            this.currentSortOrder = this.defaultSortOrder;
        }
        this.updateColumnSort();
        this.onSort({ prop: this.currentSortColumn, dir: this.currentSortOrder });
    }

    updateColumnSort(): void {
        this.columns.forEach((column) => {
            if (column.prop === this.currentSortColumn && this.currentSortOrder === 'ASC') {
                column.class = 'fa-arrow-up-short-wide';
            } else if (column.prop === this.currentSortColumn && this.currentSortOrder === 'DESC') {
                column.class = 'fa-arrow-down-wide-short';
            } else {
                column.class = 'fa-sort';
            }
        })
    }
}