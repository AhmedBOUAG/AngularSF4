import { Subject, first, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../app/services/recipe.service';
import { Recipe } from '../recipe';
import { CommonUtils } from '../../app/Utils/CommonUtils';
import { Image } from '../../app/models/image';
import { IImageRecipe } from '../../app/models/interfaces/imageRecipe';
import * as Leaflet from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../../app/shared/contact/contact.component';
import { ButtonsModule, WavesModule, CollapseModule } from 'angular-bootstrap-md'
import { MessageComponent } from '../../app/shared/forms/message/message.component';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  destroy$: Subject<void> = new Subject<void>();
  recipe: Recipe = new Recipe();
  noImage: IImageRecipe;
  isLogged: boolean;
  loggedInUser: any;
  showNavigation: boolean;
  loadingCompleted = false;
  noFoundImage: string = CommonUtils.NO_AVAILABLE_IMAGE;
  images: any[];
  optionsLF: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    const infoUser = localStorage.getItem(CommonUtils.KEY_LOCALSTORAGE_CURRENT_USER);
    this.loggedInUser = JSON.parse(infoUser!);
    const uuid = this.route.snapshot.paramMap.get('uuid');
    const recipeUuid = null != uuid ? uuid : '0';

    this.recipeService.getRecipeById(recipeUuid).subscribe((recipe: Recipe) => {
      this.showNavigation = recipe.images.length > 1 ?? false;
      if (0 === recipe.images.length) {
        this.noImage = new Image(0, this.noFoundImage, this.noFoundImage, 'image/png');
        recipe.images.push(this.noImage);
      }
      recipe.category = this.recipeService.getRecipeCategoryName(recipe.category)!;
      this.recipe = recipe;


    },
      (error: any) => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.loadingCompleted = true;
        }, 1000);
        if (undefined !== this.recipe.locality.coordonneesGeo) {
          const coordinates = this.recipe.locality.coordonneesGeo.split(',');
          setTimeout(() => {
            this.initMap(coordinates[0], coordinates[1]);
          }, 2000);
        }
      });


  }

  initMap(x: any, y: any) {
    const map = Leaflet.map('map').setView([x, y], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);
    Leaflet.marker([x, y]).addTo(map);
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

  reportRecipeOpenDialog() {
    const dialog = this.dialog.open(ContactComponent, {
      data: {
        subject: 'reportRecipe',
        recipeInfos: this.recipe
      }
    })
  }
  getImageUrl(name: null | string): string {
    return !null ? CommonUtils.UPLOAD_IMAGES_DIRECTORY + name : this.noFoundImage;
  }

  isOwnRecipe(): boolean {
    return this.loggedInUser.id === this.recipe.creator.id;
  }

  getStatusName(status: any) {
    return CommonUtils.recipeStatus[status];
  }
}

