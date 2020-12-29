import { Recette } from './../recette/recette';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  isSingleResult = false;
  baseUrl = 'http://127.0.0.1:8000/api/recette_d_f_ms';
  recettes!: Recette[];

  constructor(private http: HttpClient) { }

  /**
   * Fonction qui récupère, via l'API, toutes les recettes
   */
  getAll(): Observable<Recette[]> {
    const uri = `${this.baseUrl}`;
    return this.getRecette(uri);
  }

  getRecetteById(id: number): any {
    this.isSingleResult = true;
    const uri = `${this.baseUrl}/${id}`;
    return this.getRecette(uri);
  }

  getRecette(uri: string): any {
    //console.log(uri);
    return this.http.get<Recette[]>(uri).pipe(
      map((res: any) => {
        this.recettes = this.isSingleResult === true ? res : res['hydra:member'];
        return this.recettes;
      }),
      catchError(this.handleError));
  }


  /**
   * Fonction permettant de sauvegarder, via l'API, les données d'une recette lors de sa création
   * @recette: Recette // l'objet json de la recette créee.
   */
  store(recette: Recette): Observable<Recette[]> {
    console.log(recette);
    return this.http.post(`${this.baseUrl}`, recette)
      .pipe(map((res) => {
        console.log(res);
        //this.recettes.push(res);
        return this.recettes;
      }),
      catchError(this.handleError));
  }
  update(recette: Recette, id: number): Observable<Recette[]> {
    console.log(recette);
    return this.http.put(`${this.baseUrl}/${id}`, recette)
      .pipe(map((res) => {
        console.log(res);
        //this.recettes.push(res);
        return this.recettes;
      }),
      catchError(this.handleError));
  }
  /**
   * Fonction permettant de supprimer, par le biais de l'API, une recette existante
   * @id: number // id de la recette à supprimer
   */
  delete(id: number): Observable<{}>{
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * la gestion d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('erreur! cette opération a échoué. ');
  }
}
