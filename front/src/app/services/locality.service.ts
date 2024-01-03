import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ILocality } from './../models/interfaces/ILocality';
import { AbstractFilter } from './abstractFilter';
import { IService } from '../models/interfaces/IService';

@Injectable({
    providedIn: 'root'
})
export class LocalityService extends AbstractFilter implements IService {
    IRI_LOCALITIES = 'api/localities';
    private apiUrl = environment.apiBaseUrl + this.IRI_LOCALITIES;
    localities: ILocality[] = [];

    constructor(protected http: HttpClient) {
        super();
    }

    /**
     * Fonction qui récupère, via l'API, toutes les communes
     */
    getAll(): Observable<ILocality[]> {
        const uri = `${this.apiUrl}`;

        return this.http.get<any[]>(uri).pipe(
            map((res: any) => {
                this.localities = res['hydra:member'];

                return this.localities;
            }),
            catchError(this.handleError));
    }

    getByTerm(term: any): Observable<ILocality[]> {
        const params = { libelle: term };
        return this.http.get<any[]>(this.apiUrl, { params }).pipe(
            map((res: any) => {
                const cities = res['hydra:member'];

                return this.citiesFormatted(cities);
            }),
            catchError(this.handleError));
    }

    getHydarationIri(id: string): string {
        return `/${this.IRI_LOCALITIES}/${id}`;
    }

    citiesFormatted(cities: ILocality[]): ILocality[] {
        this.localities = [];
        cities.forEach(l => {
            this.localities.push(
                {
                    libelle: l.libelle + ' (' + l.codePostal + ')',
                    id: l.id,
                    coordonneesGeo: l.coordonneesGeo,
                    nomCommune: l.nomCommune
                });
        });

        return this.localities;
    }
    /**
     * la gestion d'erreur.
     */
    private handleError(error: HttpErrorResponse) {
        return throwError('Une erreur est survenue lors du chargement de la page. Si le problème persiste, veuillez en informer l\'administrateur du site.');
    }
}
