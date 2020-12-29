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


  recettes: any = {};
  recetteToUpdate: any = {};
  error = '';
  success = '';
  idDelete = 0;
  idUpdate = 0;


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

  editRecette(id: number): void {

    this.RecetteService.getRecetteById(id).subscribe(
      (res: Recette[]) => {
        this.idUpdate = id;
        this.recetteToUpdate = res;
        ($('#modalEditRecette') as any).modal('show');
      },
      (err: any) => {
        this.error = err;
      }
    );
  }

  getRecettes(): void {
    this.RecetteService.getAll().subscribe(
      (res: Recette[]) => {
        this.recettes = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deleteRecette(id: number): any {
    this.idDelete = id;
    ($('#modalConfirmation') as any).modal('toggle');
  }

  validateFormEdit(f: any): any {
    console.log(f.form.value);
    this.RecetteService.update(this.recetteToUpdate, this.idUpdate).subscribe(
      (res: Recette[]) => {
        console.log(res);
        ($('#modalEditRecette') as any).modal('hide');
        this.ngOnInit();
        this.success = 'Les modifications ont été apportées avec succès';
        f.reset();
    },
      (err) => {
        this.error = err;
      }
    );
  }

  confirmDelete(): void {
    this.RecetteService.delete(this.idDelete).subscribe(
      (res: any) => {
        console.log(res);
        this.success = res;
        ($('#modalConfirmation') as any).modal('hide');
        this.success = 'La recette a été supprimée de manière définitive.';
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
