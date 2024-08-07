import { Recipe } from '../recipe/recipe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IFilter } from '../models/interfaces/IFilter';
import { RecipeFilterService } from './filters/recipeFilter.service';
import { CommonUtils } from '../Utils/CommonUtils';
import { IService } from '../models/interfaces/IService';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends RecipeFilterService implements IService {

  IRI_RECIPES = 'api/recipes';
  private apiUrl = environment.apiBaseUrl + this.IRI_RECIPES;
  private ownRecipes = environment.apiBaseUrl + 'api/own_recipes';
  private lastThreeRecipes = environment.apiBaseUrl + 'api/latest_recipes_posted'
  recipes!: Recipe[];
  images = [];

  constructor(protected http: HttpClient) {
    super();
  }

  /**
   * Fonction qui récupère, via l'API, toutes les recettes
   */
  getAll(filter: IFilter = {}): Observable<Recipe[]> {
    const uri = `${this.apiUrl}`;
    let params = this.handlerParamFilter(filter);
    return this.getRecipe(uri, params);
  }

  getOwnRecipes(): Observable<Recipe[]> {
    const uri = `${this.ownRecipes}`;

    return this.getRecipe(uri);
  }


  /**
   * Permet de récuperer une recette
   * @param uuid
   */
  getRecipeById(uuid: string): any {
    const uri = `${this.apiUrl}/${uuid}`;
    return this.getRecipe(uri);
  }

  /**
   * Fonction générique pour récupérer les data de recette
   * @param uri // uri de l'API
   */
  getRecipe(uri: string, params: any = {}): any {
    return this.http.get<Recipe[]>(uri, { params: params }).pipe(
      map((res: any) => {
        this.recipes = res;
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
  update(uuid: string, recipe: any): Observable<Recipe[]> {
    return this.http.post(`${this.apiUrl}/${uuid}`, this.formDataHydrate(recipe))
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

  getHydarationIri(id: string): string {
    return `/${this.IRI_RECIPES}/${id}`;
  }

  private formDataHydrate(recipe: any) {
    const formData = new FormData();

    Object.keys(recipe).forEach(key => {
      if ('images' !== key) {
        formData.append(key, recipe[key]);
      }
      if ('locality' === key) {
        const id = recipe[key].id;
        const name = key;
        formData.delete(key);
        formData.append(name, id);
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

  getLatestRecipesPosted() {
    return this.getRecipe(this.lastThreeRecipes);
  }

  getRecipeCategoryName(categoryId: any): string | undefined {
    const categName = CommonUtils.recipeCategory.find((cat: any) => cat.id === categoryId);

    return categName?.type;
  }
  /**
   * la gestion d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    return throwError('Une erreur est survenue lors du chargement de la page. Si le problème persiste, veuillez en informer l\'administrateur du site.');
  }
}
