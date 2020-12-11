import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: 'Les pâtesseries',
      subTitle: 'Des patesseries fait maison',
      isAvailable: true
    },
    {
      title: 'Gâteau d\'anniversaire',
      subTitle: 'Gâteau d\'anniversaire fait maison',
      isAvailable: true
    },
    {
      title: 'Gourmandises',
      subTitle: 'Variété de gâteau fait maison',
      isAvailable: false
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProporties(): void {
    this.propertiesSubject.next(this.properties);
  }

  getProperties(): any {
    /* return new Promise(
      (resolve, reject) => {
        if (this.properties && this.properties.length > 0) {
          resolve(this.properties);
        } else {
          const error = new Error('Les données sont introuvables ou vides');
          reject(error);
        }
      }
    ) */

    /* return new Observable((observer) => {
      if (this.properties && this.properties.length > 0) {
        observer.next(this.properties);
        observer.complete();
      } else {
        const error = new Error('Les données sont introuvables ou vides');
        observer.error(error);
      }
    }); */
  }
}
