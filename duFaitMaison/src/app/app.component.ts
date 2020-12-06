import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'duFaitMaison';

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

  getAvailability(index: number) {
    if (this.properties[index].isAvailable) {
      return 'En stock!';
    } else {
      return 'En rupture!';
    }
  }
}
