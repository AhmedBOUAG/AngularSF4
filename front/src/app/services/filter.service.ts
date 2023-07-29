import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilter } from '../models/interfaces/IFilter';


@Injectable({
    providedIn: 'root'
})
export class FilterService {

    boCriteriaMatching: { [key: string]: string } = {
        title: 'title',
        city: 'locality.libelle',
        price: 'price',
        subtitle: 'subtitle',
        category: 'category',
        description: 'description',
        user: 'creator.username',
    };

    handlerParamFilter(filter: IFilter): HttpParams {
        let params = new HttpParams();
        params = params.append(
            CommonUtils.ITEM_PER_PAGE,
            filter.paginator !== undefined ? filter.paginator.rows : CommonUtils.NB_ITEM_PER_PAGE
        );
        params = params.append(CommonUtils._PAGE, filter.paginator !== undefined ? filter.paginator.page + 1 : 1);
        if (filter.order !== undefined && filter.orderBy !== undefined) {
            params = params.append(CommonUtils.ORDER_PARAMETER_NAME + '[' + filter.orderBy + ']', filter.order);
        }

        return this.appendAllParams(params, filter.criteria);
    }

    private appendAllParams(params: HttpParams, obj: { [key: string]: any } | undefined): HttpParams {
        if (!obj) return params;
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
                const values = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
                if ('category' === key) {
                    params = params.append(this.boCriteriaMatching[key], this.implodeCategory(values));
                    continue;
                }
                values.forEach((value: any) => {
                    params = params.append(this.boCriteriaMatching[key], value);
                });
            }
        }

        return params;
    }

    private implodeCategory(values: any): string {
        if (values && Array.isArray(values)) {
            values = values.join(',');
        }

        return values;
    }

}