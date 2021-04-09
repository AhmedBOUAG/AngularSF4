import { Recette } from './../recette/recette';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  isSingleResult = false;
  baseUrl = 'http://127.0.0.1:8000/api/recette_d_f_ms';
  recettes!: Recette[];
  images = [];

  constructor(private http: HttpClient) { }

  /**
   * Fonction qui récupère, via l'API, toutes les recettes
   */
  getAll(): Observable<Recette[]> {
    const uri = `${this.baseUrl}`;

    return this.getRecette(uri);
  }

  /**
   * Permet de récuperer une recette
   * @param id // id de la recette à récuperer
   */
  getRecetteById(id: number): any {
    this.isSingleResult = true;
    const uri = `${this.baseUrl}/${id}`;
    return this.getRecette(uri);
  }

  /**
   * Fonction générique pour récupérer les data de recette
   * @param uri // uri de l'API
   */
  getRecette(uri: string): any {
    return this.http.get<Recette[]>(uri).pipe(
      map((res: any) => {
        this.recettes = this.isSingleResult === true ? res : res['hydra:member'];
        this.isSingleResult = false;
        return this.recettes;
      }),
      catchError(this.handleError));
  }

  /**
   * Fonction permettant de sauvegarder, via l'API, les données d'une recette lors de sa création
   * @param Recette // l'objet json de la recette créee.
   */
  store(recette: Recette): Observable<Recette[]> {
    const formData = new FormData();
    for (var i = 0; i < recette.images.length; i++) {
      formData.append("images[" + i + "]", recette.images.item(i), recette.images.item(i).name);
    }
    console.log(recette);
    formData.append("title", recette.title);
    formData.append("price", recette.price);
    formData.append("subtitle", recette.subtitle);
    formData.append("category", recette.category);
    formData.append("city", recette.city);
    formData.append("description", recette.description);
    formData.append("zip", recette.zip);

    return this.http.post(`${this.baseUrl}`, formData)
      .pipe(map((res) => {
        return this.recettes;
      }),
        catchError(this.handleError));
  }

  /**
   * Fonction de mise à jour d'une recette
   * @param Recette // Les datas de la recette modifiée
   */
  update(recette: Recette): Observable<Recette[]> {
    console.log(recette);
    return this.http.put(`${this.baseUrl}/${recette.id}`, recette)
      .pipe(map((res) => {
        return this.recettes;
      }),
        catchError(this.handleError));
  }

  /**
   * Fonction permettant de supprimer, par le biais de l'API, une recette existante
   * @param id //number // id de la recette à supprimer
   */
  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * la gestion d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Une erreur est survenue lors du chargement de la page. Si le problème persiste, veuillez en informer l\'administrateur du site.');
  }
}
