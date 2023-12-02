import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    private apiUrl = environment.apiBaseUrl + 'api/user/';
    private favoriteUrl = this.apiUrl + 'recipe/favorites';

    constructor(private http: HttpClient) { }

    addToFavorite(id: number): Observable<any> {
        const dataJson = { 'recipe_id': id };

        return this.http.post(`${this.favoriteUrl}`, dataJson).pipe(map((res) => {
            return res;
        }));
    }

    getFavoriteRecipeIds(): Observable<any> {
        return this.http.get(`${this.favoriteUrl}` + '/ids').pipe(map((res) => {
            return res;
        }));
    }

    removeFromFavorite(id: number): Observable<any> {
        return this.http.delete(`${this.favoriteUrl}` + '/' + id).pipe(map((res) => {
            return res;
        }));
    }


}