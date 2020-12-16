import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties: Property[] = [];
  propertiesSubject = new Subject<any[]>();

  constructor() { 
    this.properties = [
      {
        title: 'Les pâtisseries',
        subTitle: 'Des pâtisseries fait maison',
        pseudo: 'Nathalie',
        quantity: 26,
        location: 'Drancy',
        zip: '93700',
        price: 19.34,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/19/8f/d7/e7/delicious-french-patisserie.jpg',
        isAvailable: true
      },
      {
        title: 'Gâteau d\'anniversaire',
        subTitle: 'Gâteau d\'anniversaire fait maison',
        pseudo: 'Nadia',
        quantity: 1,
        location: 'Colombes',
        zip: '92700',
        price: 25.50,
        image: 'https://larecette.net/wp-content/uploads/2018/11/D%C3%A9licieux-g%C3%A2teau-au-chocolat-et-snickers-8-1200x900.jpg',
        isAvailable: false
      },
      {
        title: 'Gourmandises',
        subTitle: 'Variété de gâteau fait maison',
        pseudo: 'Fatou',
        quantity: 19,
        location: 'Saint-denis',
        zip: '93000',
        price: 12.20,
        image: 'https://i.pinimg.com/originals/c7/74/2a/c7742a089d8d0ad44ac48554c6339625.jpg',
        isAvailable: true
      },
      {
        title: 'Gâteau Turc',
        subTitle: '',
        pseudo: 'Ardaturk',
        quantity: 1,
        location: 'Paris',
        zip: '75015',
        price: 23.90,
        image: 'https://img-3.journaldesfemmes.fr/e18EaMuH1re9pxy_8NeWGawWuEc=/750x/smart/b99ea5e4aef245eeaadd935f31cb8e9d/recipe-jdf/338923.jpg',
        isAvailable: true
      }
    ];
  }

  emitProporties(): void {
    this.propertiesSubject.next(this.properties);
  }

  getProperties(): any {
    // return this.properties;
    
    return new Observable((observer) => {
      if (this.properties && this.properties.length > 0) {
        observer.next(this.properties);
        observer.complete();
      } else {
        const error = new Error('Les données sont introuvables ou vides');
        observer.error(error);
      }
    });
  }
}
