import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export abstract class AbstractService {
    IRI_LOCALITIES = 'api/localities';
    IRI_USERS = 'api/users';
    IRI_RECIPES = 'api/recipes';

    constructor(protected http: HttpClient) { }

    hydrateUsersIri(id: string) {
        return `/${this.IRI_USERS}/${id}`;
    }

    hydrateRecipesIri(id: string) {
        return `/${this.IRI_RECIPES}/${id}`;
    }

    hydrateLocalitiesIri(id: string) {
        return `/${this.IRI_LOCALITIES}/${id}`;
    }


}
