import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilter } from '../models/interfaces/IFilter';


@Injectable({
    providedIn: 'root'
})
export class FilterService {

    params: HttpParams = new HttpParams();

    handlerParamFilter(filter: IFilter): HttpParams {
        this.params = this.params.append(
            CommonUtils.ITEM_PER_PAGE, filter.paginator !== undefined ? filter.paginator.rows : CommonUtils.NB_ITEM_PER_PAGE);
        this.params = this.params.append(CommonUtils._PAGE, filter.paginator !== undefined ? filter.paginator.page + 1 : 1);
        if (filter.order !== undefined && filter.orderBy !== undefined) {
            this.params = this.params.append(CommonUtils.ORDER_PARAMETER_NAME + '[' + filter.orderBy + ']', filter.order);
        }

        return this.params;
    }
}