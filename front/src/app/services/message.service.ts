import { UserService } from './user.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message } from "../models/Message";
import { Recipe } from "../recipe/recipe";
import { environment } from "src/environments/environment";
import { IFilter } from "../models/interfaces/IFilter";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IService } from '../models/interfaces/IService';
import { MessageFilterService } from './filters/messageFilter.service';
import { CommonUtils } from '../Utils/CommonUtils';


@Injectable({
    providedIn: 'root'
})

export class MessageService extends MessageFilterService implements IService {
    IRI_MESSAGES = 'api/messages';
    baseUrl = environment.apiBaseUrl + 'api/messages';

    constructor(
        protected http: HttpClient,
        readonly RecipeService: RecipeService,
        readonly userService: UserService) {
        super();
    }

    send(message: Message) {
        this.http.post(this.baseUrl, message).subscribe();
    }

    getMessages(type = 'inbox', filter: IFilter = {}): Observable<Message[]> {
        let params = this.handlerParamFilter(filter);
        const apiUrl = type === 'sent' ? '/my-sendered-messages' : '/my-inbox-messages';
        return this.http.get<Message[]>(this.baseUrl + apiUrl, { params: params }).pipe(
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
        message.recipient = this.userService.getHydarationIri(recipe.creator.id);
        message.relatedRecipe = this.RecipeService.getHydarationIri(recipe.id);
        this.userService.getClaimsCurrentUser().subscribe((user: any) => {
            message.sender = this.userService.getHydarationIri(user.id);
        });
        console.log(message);
        return message;
    }

}
