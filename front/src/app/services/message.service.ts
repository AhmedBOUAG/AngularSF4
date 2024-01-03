import { UserService } from './user.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message } from "../models/Message";
import { Recipe } from "../recipe/recipe";
import { environment } from "src/environments/environment";
import { IFilter } from "../models/interfaces/IFilter";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IService } from '../models/interfaces/IService';
import { MessageFilterService } from './filters/messageFilter.service';


@Injectable({
    providedIn: 'root'
})

export class MessageService extends MessageFilterService implements IService {
    IRI_MESSAGES = 'api/messages';
    baseUrl = environment.apiBaseUrl + 'api/messages';

    constructor(protected http: HttpClient, readonly RecipeService: RecipeService, readonly UserService: UserService) {
        super();
    }

    send(message: Message) {
        this.http.post(this.baseUrl, message).subscribe();
    }

    getSendedMessages(filter: IFilter = {}): Observable<Message[]> {
        let params = this.handlerParamFilter(filter);
        return this.http.get<Message[]>(this.baseUrl + '/my-sendered-messages', { params: params }).pipe(
            map((res: Message[]) => {
                return res;
            })
        );
    }

    getHydarationIri(id: string): string {
        return `/${this.IRI_MESSAGES}/${id}`;
    }

    hydrateMessagesIri(form: any, recipe: Recipe): Message {
        const message: Message = new Message();
        message.content = form.value.content;
        message.recipient = this.UserService.getHydarationIri(recipe.creator.id);
        message.relatedRecipe = this.RecipeService.getHydarationIri(recipe.id);

        return message;
    }

}
