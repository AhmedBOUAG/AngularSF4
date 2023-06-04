import { IPaginate } from "./IPaginate";

export interface IFilter {
    orderBy?: string;
    order?: string;
    paginator?: IPaginate
}