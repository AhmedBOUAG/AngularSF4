import { Injectable } from '@angular/core';
import { AbstractFilter } from '../abstractFilter';


@Injectable({
    providedIn: 'root'
})
export class MessageFilterService extends AbstractFilter {

    boMatchingCriteria: { [key: string]: string } = {
        'Content': 'content',
        'To': 'recipient.username',
        'SendAt': 'createdAt',
        'relatedRecipe': 'relatedRecipe'
    };
}