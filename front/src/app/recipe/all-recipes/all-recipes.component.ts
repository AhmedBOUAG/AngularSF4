import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../recipe';
import { CommonUtils } from '../../app/Utils/CommonUtils';
import { Subject, takeUntil, filter } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { MessageHandlerService } from '../../app/services/message-handler.service';
import { SelectItem } from 'primeng/api';
import { IUserInfo } from '../../app/models/interfaces/IUserInfo';
import { ILocality } from '../../app/models/interfaces/ILocality';
import { IPaginate } from '../../app/models/interfaces/IPaginate';
import { IFilter } from '../../app/models/interfaces/IFilter';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../../app/shared/filter/Recipe/filter.component';
import { RecipeFilterService } from '../../app/services/filters/recipeFilter.service';
import { FavoriteService } from '../../app/services/favorite.service';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { AbstractDatatable } from '../../app/datatables/abstractDatatable';
import { MessageComponent } from '../../app/shared/forms/message/message.component';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent extends AbstractDatatable implements OnInit {
  @ViewChild('p', { static: false }) paginator: Paginator;
  destroy$: Subject<void> = new Subject<void>();
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  layout: string = 'list';
  recipes: Recipe[];
  items: MenuItem[];
  allItems: any[];
  selectedRecipe: Recipe;
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
    private recipeFilterService: RecipeFilterService,
    private favoriteService: FavoriteService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadRecipeFavoriteIds();
    this.breadcrumbMenuItems = [{ label: 'Recipe', routerLink: '/recipe' }];
    this.getData();
    this.sortOptions = [
      { icon: 'pi pi-sort-numeric-down-alt', label: 'Décroissant', value: '!price' },
      { icon: 'pi pi-sort-numeric-down', label: 'Croissant', value: 'price' }
    ];
    this.allItems = [
      {
        tabindex: 'access_to',
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate(['/recipe/details', this.selectedRecipe.id]);
        }
      },
      {
        tabindex: 'send_msg',
        icon: 'pi pi-envelope',
        command: () => {
          this.recipeOwnerContactOpenDialog(this.selectedRecipe);
        }
      },
      {
        tabindex: 'like',
        icon: 'pi pi-heart',
        command: () => {
          this.favoriteService.addToFavorite(this.selectedRecipe.id)
            .subscribe(
              (res: any) => {
                this.loadRecipeFavoriteIds();
                this.getData()
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
          this.favoriteService.removeFromFavorite(this.selectedRecipe.id)
            .subscribe(
              (res: any) => {
                this.loadRecipeFavoriteIds();
                this.getData()
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

  protected getData(filter: IFilter = {}, operationType = 'undefined',): any {
    this.RecipeService.getAll(filter).pipe(takeUntil(this.destroy$)).subscribe(
      (res: any) => {
        this.recipes = res[CommonUtils.RESPONSE_ARRAY_KEY].map((recipe: any) => {
          if (!Boolean(recipe.images.length)) {
            recipe.coverage = this.uploadImage + CommonUtils.NO_AVAILABLE_IMAGE;
          } else {
            recipe.coverage = this.uploadImage + recipe.images[0].name;
          }
          recipe.status = CommonUtils.recipeStatus[recipe.status];

          return recipe;
        });
        this.nbItem = res[CommonUtils.RESPONSE_TOTALITEMS_KEY];
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
          this.getData();
        }
      );
  }
  getCategory(id: number) {
    return CommonUtils.recipeCategory.find(cat => cat.id === id)?.type;
  }

  paginateToFirstSortedPage() {
    this.filter.paginator = { page: 0, first: 0, rows: this.nbItemPerPage };
    this.getData(this.filter);
  }

  getLocality(locality: ILocality) {
    return CommonUtils.localityToString(locality);
  }

  onPageChange(event: IPaginate) {
    this.nbItemPerPage = event.rows;
    this.filter.paginator = event;
    this.getData(this.filter);
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

    dialogRef.afterClosed().subscribe(valueSubmitted => {
      const [filteredItem, event] = valueSubmitted || [];
      if (!filteredItem) return;

      const { price, ...filteredCriteria } = filteredItem || {};

      this.filter.order = price ? price.toUpperCase() : '';
      this.filter.orderBy = price ? 'price' : '';
      this.filter.criteria = filteredCriteria;

      this.filterCount = this.recipeFilterService.onFilterCount(this.filter);
      this.paginateToFirstSortedPage();
      this.paginator.changePageToFirst(event);
    });
  }

  recipeOwnerContactOpenDialog(recipe: Recipe) {
    const dialog = this.dialog.open(MessageComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        subject: 'recipeOwnerContact',
        recipeInfos: recipe
      }
    })
  }

  displayMessage(type: string) {
    this.messageService.add(this.mhs.display(type.toUpperCase()));
  }

  errorHandler(err: any) {
    this.messageService.add(this.mhs.display(err, '', true));
  }
}
