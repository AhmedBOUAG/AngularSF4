import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { Injectable } from '@angular/core';
import { AbstractFilter } from '../abstractFilter';
import { IRecipeFilterSearch } from '../../models/interfaces/IRecipeFilterSearch';


@Injectable({
    providedIn: 'root'
})
export class RecipeFilterService extends AbstractFilter {

    boMatchingCriteria: { [key: string]: string } = {
        title: 'title',
        city: 'locality.libelle',
        price: 'price',
        subtitle: 'subtitle',
        category: 'category',
        description: 'description',
        user: 'creator.username',
    };

    onFilterCount(filter: any): string {
        let filterCount = 0;
        filterCount = Object.keys(filter.criteria ?? {}).filter((key) => {
            const value = filter.criteria?.[key as keyof IRecipeFilterSearch];
            return !CommonUtils.isEmptyValue(value);
        }).length;
        filterCount += !CommonUtils.isEmptyValue(filter.order) ? 1 : 0;

        return filterCount.toString();
    }

}