import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties: Property[] = [];
  propertiesSubject = new Subject<any[]>();

  constructor() {}

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
