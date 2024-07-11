import { UserRegistration } from './../registration/registration';
import { Recipe } from '../recipe/recipe';
import { IUser } from './interfaces/IUser';


export class Message {
    id?: string;
    readed?: boolean;
    content!: string;
    createdAt?: Date;
    updatedAt?: Date;
    parent?: string;
    sender?: string;
    recipient?: string;
    relatedRecipe?: string;
}