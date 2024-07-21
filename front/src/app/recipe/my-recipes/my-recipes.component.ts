import { LoaderService } from './../../services/loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe';
import { MessageHandlerService } from '../../services/message-handler.service';
import { takeUntil } from 'rxjs/operators';
import { CommonUtils } from '../../app/Utils/CommonUtils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecipeComponent } from '../../app/shared/forms/recipe/recipe.component';
import { ConfirmationMatModalComponent } from '../../shared/confirmation-mat-modal/confirmation-mat-modal.component';
import { MenuItem, MessageService } from 'primeng/api';
import { IUserInfo } from '../../models/interfaces/IUserInfo';
import { ILocality } from '../../app/models/interfaces/ILocality';
import { IButton } from '../../app/models/interfaces/IButton';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  user_info: IUserInfo = JSON.parse(localStorage.getItem(CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER)!);
  tmpData: any;
  isLoad = true;
  isLoading: boolean = false;
  messageHandler: any = {};
  thumbnails: any = [];
  tabIdImageToRemove: any = [];
  recipes: Recipe[] = [];
  recipeToUpdate: Recipe = new Recipe();
  uploadImage = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  items: MenuItem[];
  selectedItemId: any = null;
  breadcrumbMenuItems: MenuItem[];
  infosButton: IButton;

  constructor(
    private RecipeService: RecipeService,
    private mhs: MessageHandlerService,
    private router: Router,
    private dialog: MatDialog,
    private LoaderService: LoaderService,
    private messageService: MessageService

  ) {
  }

  ngOnInit(): void {
    this.breadcrumbMenuItems = [{ label: 'Recipe', routerLink: '/recipe' }, { label: 'Mes recettes' }];
    this.getRecipes();
    this.LoaderService.isLoading.subscribe((loaded) => {
      this.isLoading = loaded;
    });
    this.items = [
      {
        tabindex: 'edit',
        icon: 'pi pi-pencil',
        command: () => {
          this.preEditRecipe(this.selectedItemId);
        }
      },
      {
        tabindex: 'access_to',
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate(['/recipe/details', this.selectedItemId]);
        }
      },
      {
        tabindex: 'delete',
        icon: 'pi pi-trash',
        command: () => {
          this.openDeleteConfirmationModal(this.selectedItemId);
        }
      }
    ];
  }
  preEditRecipe(uuid: string): void {
    this.RecipeService.getRecipeById(uuid).pipe(takeUntil(this.destroy$)).subscribe(
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
          minWidth: '95%',
          minHeight: '80%',
          data: {
            recipe: this.recipeToUpdate
          },
        });

        dialogRef.afterClosed().subscribe(operationType => {
          this.getRecipes(operationType)
        });
      }
    );
  }

  getRecipes(operationType = 'undefined'): void {
    this.RecipeService.getOwnRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (res: any) => {
        this.recipes = res['hydra:member'].map((recipe: any) => {
          if (!Boolean(recipe.images.length)) {
            recipe.coverage = this.uploadImage + CommonUtils.NO_AVAILABLE_IMAGE;
          } else {
            recipe.coverage = this.uploadImage + recipe.images[0].name;
          }
          recipe.status = CommonUtils.recipeStatus[recipe.status];

          return recipe;
        });
      },
      (err) => this.errorHandler(err),
      () => {
        if ('undefined' !== operationType) {
          this.displayMessage(operationType);
        }
      }
    );
  }

  openDeleteConfirmationModal(id: number): any {
    this.infosButton = {
      icon: 'pi-trash',
      libelle: 'Supprimer',
      type: 'danger'
    }
    const dialog = this.dialog.open(ConfirmationMatModalComponent, {
      width: '680px',
      data: {
        message: CommonUtils.POPIN_RECIPE_DELETE_MSG,
        button: this.infosButton
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
        this.displayMessage(CommonUtils.DELETE);
        this.getRecipes();
      },
      (err) => {
        this.errorHandler(err);
      }
    );
  }
  getLocality(locality: ILocality) {
    return CommonUtils.localityToString(locality);
  }
  goToCreateForm() {
    this.router.navigate(['/create']);
  }
  displayMessage(type: string) {
    this.messageService.add(this.mhs.display(type.toUpperCase()));
  }
  errorHandler(err: any) {
    this.messageService.add(this.mhs.display(err, '', true));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
