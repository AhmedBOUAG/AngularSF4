import { PropertiesService } from './../services/properties.service';
import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecetteService } from './../services/recette.service';
import { Recette } from './../recette/recette';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  properties = [];
  propertiesSubscription: Subscription = new Subscription();


  recettes: Recette[] | any;
  error = '';
  success = '';
  idDelete = 0;


  constructor(private propertiesService: PropertiesService, private RecetteService: RecetteService) {
  }


  ngOnInit(): void {
    /* this.propertiesService.getProperties().then(
      (data: any) => {
        console.log(data);
        this.properties = data;
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    ) */
    this.getRecettes();

    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
  }

  getRecettes(): void {
    this.RecetteService.getAll().subscribe(
      (res: Recette[]) => {
        console.log(res);
        this.recettes = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getAvailability(index: number): string {
    if (this.properties[index]) {
      return 'En stock!';
    } else {
      return 'En rupture!';
    }
  }

  editRecette(i: number): any {
    console.log(i);
  }

  deleteRecette(id: number): any {
    console.log('Supression id:' + id);
    this.idDelete = id;
    ($('#modalConfirmation') as any).modal('toggle');
  }

  confirmDelete(): void {
    this.RecetteService.delete(this.idDelete).subscribe(
      (res: any) => {
        console.log(res);
        this.success = res;
        ($('#modalConfirmation') as any).modal('hide');
      },
      (err) => {
        this.error = err;
      }
    );
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();

  }
}
