import { element } from 'protractor';
import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecetteService } from './../services/recette.service';
import { Recette } from './../recette/recette';
import { MessageHandlerService } from './../services/message-handler.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  isLoad = true;
  messageHandler: any = {};
  tabIdImageToRemove: any = [];
  recettes: Recette[] = [];
  recetteToUpdate: Recette = new Recette();
  idDelete = 0;
  uploadImage = "http://127.0.0.1:8000/images/";

  constructor(private RecetteService: RecetteService, private mhs: MessageHandlerService) {
  }

  ngOnInit(): void {
    this.getRecettes();
  }

  editRecette(id: number): void {
    this.RecetteService.getRecetteById(id).subscribe(
      (res: Recette) => {
        this.tabIdImageToRemove.pop();
        this.recetteToUpdate = res;
        ($('#modalEditRecette') as any).modal('show');
      },
      (err: any) => {
        this.errorHandler(err);
      }
    );
  }

  getRecettes(): void {
    this.RecetteService.getAll().subscribe(
      (res: Recette[]) => {
        this.recettes = res;
      },
      (err) => {
        this.errorHandler(err);
      }
    );
  }

  deleteRecette(id: number): any {
    this.idDelete = id;
    ($('#modalConfirmation') as any).modal('toggle');
  }

  saveFormEdit(f: any): any {
    this.tabIdImageToRemove.forEach((imgToRemove: any) => {
      this.recetteToUpdate.images.forEach((imgToUpdate: any, index: any) => {
        if (imgToUpdate.id === imgToRemove) {
          this.recetteToUpdate.images.splice(index, 1);
        }
      });
    });
    console.log(this.recetteToUpdate);
    this.tabIdImageToRemove.pop();
    console.log(this.recetteToUpdate);
    this.RecetteService.update(this.recetteToUpdate).subscribe(
      (res: Recette[]) => {
        ($('#modalEditRecette') as any).modal('hide');
        this.getRecettes();
        this.messageHandler = this.mhs.display('MODIF');
        setTimeout(() => this.messageHandler = {}, 7000);
        f.reset();
      },
      (err) => {
        this.errorHandler(err);
      }
    );
  }

  confirmDelete(): void {
    this.RecetteService.delete(this.idDelete).subscribe(
      (res: any) => {
        ($('#modalConfirmation') as any).modal('hide');
        this.getRecettes();
        this.messageHandler = this.mhs.display('DELETE');
        setTimeout(() => this.messageHandler = {}, 7000);
      },
      (err) => {
        this.errorHandler(err);
      }
    );
  }
  handleFileInput(event: any) {
    // this.recette.images = event.target.files;
  }

  deleteThumbnailRecette(idImg: any) {
    this.tabIdImageToRemove.push(idImg);
    console.log(this.tabIdImageToRemove);
    return this.tabIdImageToRemove;

  }

  errorHandler(err: any) {
    this.messageHandler = this.mhs.display(err, true);
  }

  ngOnDestroy(): void {
  }
}
