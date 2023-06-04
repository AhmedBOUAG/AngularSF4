import { IFilter } from './interfaces/IFilter';
import { IPaginate } from './interfaces/IPaginate';


export class Filter implements IFilter {

    orderBy?: string;
    order?: string;
    paginator?: IPaginate;
    constructor(
        orderBy = undefined,
        order = 'ASC',
        paginator: IPaginate | undefined
    ) {
        this.orderBy = orderBy;
        this.order = order;
        this.paginator = paginator;
    }

}