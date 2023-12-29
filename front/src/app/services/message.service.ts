import { Inject, Injectable } from "@angular/core";
import { AbstractService } from "./abstractService";
import { HttpClient } from "@angular/common/http";
import { Message } from "../models/Message";
import { Recipe } from "../recipe/recipe";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class MessageService extends AbstractService {

    baseUrl = environment.apiBaseUrl + 'api/messages';

    constructor(protected http: HttpClient) {
        super(http);
    }


    send(message: Message) {
        this.http.post(this.baseUrl, message).subscribe();
    }

    hydrateMessagesIri(form: any, recipe: Recipe): Message {
        const message: Message = new Message();
        message.content = form.value.content;
        message.recipient = this.hydrateUsersIri(recipe.creator.id);
        message.relatedRecipe = this.hydrateRecipesIri(recipe.id);

        return message;
    }




}
