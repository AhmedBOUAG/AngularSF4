import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { Subject, takeUntil, filter } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { MessageHandlerService } from 'src/app/services/message-handler.service';
import { SelectItem } from 'primeng/api';
import { IUserInfo } from 'src/app/models/interfaces/IUserInfo';
import { ILocality } from 'src/app/models/interfaces/ILocality';
import { IPaginate } from 'src/app/models/interfaces/IPaginate';
import { IFilter } from 'src/app/models/interfaces/IFilter';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from 'src/app/sharing/filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  destroy$: Subject<void> = new Subject<void>();
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  layout: string = 'list';
  recipes: Recipe[];
  items: MenuItem[];
  allItems: any[];
  selectedItemId: any = null;
  recipeCreatorId: any;
  uploadImage: string = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  currentUser: IUserInfo = JSON.parse(localStorage[CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER]);
  breadcrumbMenuItems: MenuItem[];
  nbItemPerPage = CommonUtils.NB_ITEM_PER_PAGE;
  nbItem = 0;
  filter: IFilter = {};
  favoriteRecipeIds: number[] = [];
  filterCount: string;
  heartBrokenIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16"><path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/></svg>';

  constructor(
    private RecipeService: RecipeService,
    private messageService: MessageService,
    private mhs: MessageHandlerService,
    private modalDialog: MatDialog,
    private filterService: FilterService,
    private favoriteService: FavoriteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRecipeFavoriteIds();
    this.breadcrumbMenuItems = [{ label: 'Recipe', routerLink: '/recipe' }];
    this.getRecipes();
    this.sortOptions = [
      { icon: 'pi pi-sort-numeric-down-alt', label: 'Décroissant', value: '!price' },
      { icon: 'pi pi-sort-numeric-down', label: 'Croissant', value: 'price' }
    ];
    this.allItems = [
      {
        tabindex: 'access_to',
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate(['/recipe/details', this.selectedItemId]);
        }
      },
      {
        tabindex: 'send_msg',
        icon: 'pi pi-envelope',
        routerLink: ['/fileupload']
      },
      {
        tabindex: 'like',
        icon: 'pi pi-heart',
        command: () => {
          this.favoriteService.addToFavorite(this.selectedItemId)
            .subscribe(
              (res: any) => {
                this.loadRecipeFavoriteIds();
                this.getRecipes()
              },
              (err) => this.errorHandler(err),
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Favoris',
                  detail: 'Recette ajoutée à mes favoris.'
                });
              });
        }
      },
      {
        tabindex: 'unlike',
        icon: 'pi pi-heart-fill',
        command: () => {
          this.favoriteService.removeFromFavorite(this.selectedItemId)
            .subscribe(
              (res: any) => {
                this.loadRecipeFavoriteIds();
                this.getRecipes()
              },
              (err) => this.errorHandler(err),
              () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Favoris',
                  detail: 'Recette retirée de mes favoris.'
                });
              });
        }

      }
    ];
  }

  calculateItemsMenu(recipe: Recipe) {
    for (let index = 0; index < this.allItems.length; index++) {
      if (this.currentUser.id === recipe.creator.id) {
        this.items = this.allItems.filter(item => ['edit', 'access_to'].includes(item.tabindex));
      } else {
        this.items = this.allItems.filter(item => item.tabindex !== 'edit');
      }

      if (this.favoriteRecipeIds.includes(recipe.id)) {
        this.items = this.items.filter(item => item.tabindex !== 'like');
      } else {
        this.items = this.items.filter(item => item.tabindex !== 'unlike');
      }
    }
  }

  getItems(recipe: any) {
    this.calculateItemsMenu(recipe);

    return this.items;
  }

  private getRecipes(filter: IFilter = {}, operationType = 'undefined',): void {
    this.RecipeService.getAll(filter).pipe(takeUntil(this.destroy$)).subscribe(
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
        this.nbItem = res['hydra:totalItems'];
      },
      (err) => this.errorHandler(err),
      () => {
        if ('undefined' !== operationType) {
          this.displayMessage(operationType);
        }
      }
    );
  }

  loadRecipeFavoriteIds() {
    this.favoriteService.getFavoriteRecipeIds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
          this.favoriteRecipeIds = res;
        },
        (err) => this.errorHandler(err),
        () => {
          this.getRecipes();
        }
      );
  }
  getCategory(id: number) {
    return CommonUtils.recipeCategory.find(cat => cat.id === id)?.type;
  }

  paginateToFirstSortedPage() {
    this.filter.paginator = { page: 0, first: 0, rows: this.nbItemPerPage };
    this.getRecipes(this.filter);
  }

  getLocality(locality: ILocality) {
    return CommonUtils.localityToString(locality);
  }

  onPageChange(event: IPaginate) {
    this.nbItemPerPage = event.rows;
    this.filter.paginator = event;
    this.getRecipes(this.filter);
  }

  onModalFilter() {
    const dialogRef = this.modalDialog.open(FilterComponent, {
      panelClass: '',
      minWidth: '80%',
      minHeight: '50%',
      data: {
        filter: this.filter
      },
    });

    dialogRef.afterClosed().subscribe(filteredItem => {
      this.filter.order = '';
      this.filter.orderBy = '';
      if (!filteredItem) return;
      if ('' !== filteredItem?.price && null !== filteredItem?.price && undefined !== filteredItem?.price) {
        this.filter.order = filteredItem.price.toUpperCase();
        this.filter.orderBy = 'price';
        delete filteredItem.price;
      }

      this.filter.criteria = filteredItem;
      this.filterCount = this.filterService.onFilterCount(this.filter);
      this.paginateToFirstSortedPage();
    });
  }

  displayMessage(type: string) {
    this.messageService.add(this.mhs.display(type.toUpperCase()));
  }

  errorHandler(err: any) {
    this.messageService.add(this.mhs.display(err, '', true));
  }
}
