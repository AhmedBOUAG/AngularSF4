import { IFilterSearch } from "./IFilterSearch";
import { IPaginate } from "./IPaginate";

export interface IFilter {
    orderBy?: string;
    order?: string;
    criteria?: IFilterSearch;
    paginator?: IPaginate
}