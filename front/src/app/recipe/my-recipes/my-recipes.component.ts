import { LoaderService } from './../../services/loader.service';
import { element } from 'protractor';
import { AppComponent } from '../../app.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe';
import { MessageHandlerService } from '../../services/message-handler.service';
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeComponent } from 'src/app/sharing/forms/recipe.component';
import { ConfirmationMatModalComponent } from '../../sharing/confirmation-mat-modal/confirmation-mat-modal.component';
@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  tmpData: any;
  isLoad = true;
  isLoading: boolean = false;
  messageHandler: any = {};
  thumbnails: any = [];
  tabIdImageToRemove: any = [];
  recipes: Recipe[] = [];
  recipeToUpdate: Recipe = new Recipe();
  uploadImage = CommonUtils.UPLOAD_IMAGES_DIRECTORY;

  constructor(
    private RecipeService: RecipeService,
    private mhs: MessageHandlerService,
    private router: Router,
    private dialog: MatDialog,
    private LoaderService: LoaderService

  ) {
  }

  ngOnInit(): void {
    this.getRecipes();
    this.LoaderService.isLoading.subscribe((loaded) => {
      this.isLoading = loaded;
    });
  }

  preEditRecipe(id: number): void {
    this.RecipeService.getRecipeById(id).pipe(takeUntil(this.destroy$)).subscribe(
      (res: Recipe) => {
        this.tabIdImageToRemove.pop();
        this.recipeToUpdate = res;
        this.thumbnails = this.recipeToUpdate.images;
      },
      (err: any) => {
        this.errorHandler(err);
      },
      () => {
        const dialogRef = this.dialog.open(RecipeComponent, {
          width: '800px',
          data: {
            recipe: this.recipeToUpdate
          },
        });

        dialogRef.afterClosed().subscribe(operationType => this.getRecipes(operationType));
      }
    );
  }

  getRecipes(operationType = 'undefined'): void {
    this.RecipeService.getOwnRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (res: Recipe[]) => this.recipes = res,
      (err) => this.errorHandler(err),
      () => {
        if ('undefined' !== operationType) {
          this.displayMessage(operationType);
        }
      }
    );
  }

  openDeleteConfirmationModal(id: number): any {
    const dialog = this.dialog.open(ConfirmationMatModalComponent, {
      width: '680px',
      data: {
        message: 'Vous êtes sur le point de <b>supprimer</b> cette recette. Cette action est définitive et irréversible. <br /><br />Vous souhaitez continuer quand même?',
        confirmButton: 'Oui'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if ('confirmed' === result) {
        this.deleteConfirmed(id);
      }
    });
  }

  deleteConfirmed(id: number): void {
    this.RecipeService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.displayMessage('delete');
        this.getRecipes();
      },
      (err) => {
        this.errorHandler(err);
      }
    );
  }

  goToCreateForm() {
    this.router.navigate(['/create']);
  }
  displayMessage(type: string) {
    this.messageHandler = this.mhs.display(type.toUpperCase());
    setTimeout(() => this.messageHandler = {}, 7000);
  }
  errorHandler(err: any) {
    this.messageHandler = this.mhs.display(err, '', true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
