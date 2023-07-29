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
import { Filter } from 'src/app/models/Filter';
import { IFilter } from 'src/app/models/interfaces/IFilter';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from 'src/app/sharing/filter/filter.component';
import { IFilterSearch } from 'src/app/models/interfaces/IFilterSearch';

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
  filterCount: string;

  constructor(
    private RecipeService: RecipeService,
    private messageService: MessageService,
    private mhs: MessageHandlerService,
    private modalDialog: MatDialog
  ) { }

  ngOnInit(): void {
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
          this.messageService.add({ severity: 'success', summary: 'Favoris', detail: 'Recette ajoutée à mes favoris.' });
        }
      }
    ];
  }

  onFilterCount() {
    let filterCount = 0;
    filterCount = Object.keys(this.filter.criteria ?? {}).filter((key) => {
      const value = this.filter.criteria?.[key as keyof IFilterSearch];
      return value !== undefined && value !== null && value !== '';
    }).length;
    filterCount += this.filter.order !== undefined ? 1 : 0;
    this.filterCount = filterCount.toString();
  }
  calculateItemsMenu(creatorId: number) {
    for (let index = 0; index < this.allItems.length; index++) {
      if (this.currentUser.id === creatorId) {
        this.items = this.allItems.filter(item => ['edit', 'access_to'].includes(item.tabindex));
      } else {
        this.items = this.allItems.filter(item => item.tabindex !== 'edit');
      }
    };
  }

  getItems(recipe: any) {
    this.calculateItemsMenu(recipe.creator.id);

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
      minWidth: '50%',
      minHeight: '50%',
      data: {
        filter: this.filter
      },
    });

    dialogRef.afterClosed().subscribe(filteredItem => {
      if (!filteredItem) return;
      if ('' !== filteredItem?.price && null !== filteredItem?.price && undefined !== filteredItem?.price) {
        this.filter.order = filteredItem.price.toUpperCase();
        this.filter.orderBy = 'price';
        delete filteredItem.price;
      }

      this.filter.criteria = filteredItem;
      this.onFilterCount();
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
