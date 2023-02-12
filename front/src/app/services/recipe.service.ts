import { Recipe } from '../recipe/recipe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //isSingleResult = false;
  private apiUrl = environment.apiBaseUrl + 'api/recette_d_f_ms';
  private ownRecipes = environment.apiBaseUrl + 'api/own_recipes';
  private lastThreeRecipes = environment.apiBaseUrl + 'api/last_three_recipes'
  recipes!: Recipe[];
  images = [];

  constructor(private http: HttpClient) { }

  /**
   * Fonction qui récupère, via l'API, toutes les recettes
   */
  getAll(): Observable<Recipe[]> {
    const uri = `${this.apiUrl}`;

    return this.getRecipe(uri);
  }

  getOwnRecipes(): Observable<Recipe[]> {
    const uri = `${this.ownRecipes}`;

    return this.getRecipe(uri);
  }


  /**
   * Permet de récuperer une recette
   * @param id
   */
  getRecipeById(id: number): any {
    //this.isSingleResult = true;
    const uri = `${this.apiUrl}/${id}`;
    return this.getRecipe(uri);
  }

  /**
   * Fonction générique pour récupérer les data de recette
   * @param uri // uri de l'API
   */
  getRecipe(uri: string): any {
    return this.http.get<Recipe[]>(uri).pipe(
      map((res: any) => {
        this.recipes = res;
        //this.recipes = this.isSingleResult ? res : res['hydra:member'];
        //this.isSingleResult = false;
        return this.recipes;
      }),
      catchError(this.handleError));
  }

  /**
   * Fonction permettant de sauvegarder, via l'API, les données d'une recette lors de sa création
   * @param Recipe // l'objet json de la recette créee.
   */
  create(recipe: any): Observable<Recipe[]> {
    return this.http.post(`${this.apiUrl}`, this.formDataHydrate(recipe))
      .pipe(map((res) => {
        return this.recipes;
      }),
        catchError(this.handleError));
  }

  /**
   * Fonction de mise à jour d'une recette
   * @param Recette // Les datas de la recette modifiée
   */
  update(id: number, recipe: any): Observable<Recipe[]> {
    return this.http.post(`${this.apiUrl}/${id}`, this.formDataHydrate(recipe))
      .pipe(map((res) => {
        return this.recipes;
      }),
        catchError(this.handleError));
  }

  /**
   * Fonction permettant de supprimer, par le biais de l'API, une recette existante
   * @param id //number // id de la recette à supprimer
   */
  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private formDataHydrate(recipe: any)
  {
    const formData = new FormData();

    Object.keys(recipe).forEach(key => {
      if ('images' !== key ) {
        formData.append(key, recipe[key]);
      }
    });

    if (recipe.images.length) {
      for (var i = 0; i < recipe.images.length; i++) {
        formData.append("images[" + i + "]", recipe.images.item(i), recipe.images.item(i).name);
      }
    }
    if ('deletedThumbnails' in recipe && recipe.deletedThumbnails.length === 0) {
      formData.delete('deletedThumbnails');
    }

    return formData;
  }

  getLastThreeRecipies() {
    return this.getRecipe(this.lastThreeRecipes);
  }

  /**
   * la gestion d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    return throwError('Une erreur est survenue lors du chargement de la page. Si le problème persiste, veuillez en informer l\'administrateur du site.');
  }
}
