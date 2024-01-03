import { IRecipeFilterSearch } from "./IRecipeFilterSearch";
import { IPaginate } from "./IPaginate";

export interface IFilter {
    orderBy?: string;
    order?: string;
    criteria?: IRecipeFilterSearch;
    paginator?: IPaginate
}