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
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharingComponent } from 'src/app/sharing/forms/sharing.component';
@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tmpData: any;
  isLoad = true;
  messageHandler: any = {};
  thumbnails: any = [];
  tabIdImageToRemove: any = [];
  recipes: Recipe[] = [];
  recipeToUpdate: Recipe = new Recipe();
  idDelete = 0;
  uploadImage = CommonUtils.UPLOAD_IMAGES_DIRECTORY;

  constructor(
    private RecipeService: RecipeService,
    private mhs: MessageHandlerService,
    private router: Router,
    private dialog: MatDialog

  ) {
  }

  ngOnInit(): void {
    this.getRecipes();
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
        const dialogRef = this.dialog.open(SharingComponent, {
          width: '800px',
          data: {
            recipe: this.recipeToUpdate
          },
        });

        dialogRef.afterClosed().subscribe(operationType => {
          this.displayMessage(operationType);
          this.getRecipes();
        });
      }
    );
  }

  getRecipes(): void {
    this.RecipeService.getOwnRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (res: Recipe[]) => {
        this.recipes = res;
      },
      (err) => {
        this.errorHandler(err);
      },
      () => {}
    );
  }

  deleteRecipe(id: number): any {
    console.log(id);
    this.idDelete = id;
    ($('#modalConfirmation') as any).modal('toggle');
  }

  confirmDelete(): void {
    this.RecipeService.delete(this.idDelete).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        ($('#modalConfirmation') as any).modal('hide');
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
  }
}
