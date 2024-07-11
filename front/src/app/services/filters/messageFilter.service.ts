import { Injectable } from '@angular/core';
import { AbstractFilter } from '../abstractFilter';


@Injectable({
    providedIn: 'root'
})
export class MessageFilterService extends AbstractFilter {

    boMatchingCriteria: { [key: string]: string } = {
        'content': 'content',
        'to': 'recipient.username',
        'createdAt': 'createdAt',
        'relatedRecipe': 'relatedRecipe',
        'from': 'sender.username',
    };
}