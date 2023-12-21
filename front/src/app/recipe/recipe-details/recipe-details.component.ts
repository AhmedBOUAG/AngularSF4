import { Subject, first, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { Image } from 'src/app/models/image';
import { IImageRecipe } from 'src/app/models/interfaces/imageRecipe';
import * as Leaflet from 'leaflet';
import { AuthStatusService } from 'src/app/services/auth-status.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from 'src/app/sharing/contact/contact.component';
import { ButtonsModule, WavesModule, CollapseModule } from 'angular-bootstrap-md'


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
    private authStatusService: AuthStatusService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    console.log('oui')
    /*this.authStatusService.isloggededIn$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        console.log(value)
        this.isLogged = value;
      });*/
    const infoUser = localStorage.getItem('info_user');
    this.loggedInUser = JSON.parse(infoUser!);
    const id = this.route.snapshot.paramMap.get('id');
    const recipeId = null != id ? Number(id) : 0;

    this.recipeService.getRecipeById(recipeId).subscribe((recipe: Recipe) => {
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
    //Leaflet.Icon.Default.imagePath = 'assets/leaflet/images/';
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);
    Leaflet.marker([x, y]).addTo(map);
  }
  recipeOwnerContactOpenDialog() {
    console.log('envoi message')
    const dialog = this.dialog.open(ContactComponent, {
      data: {
        subject: 'recipeOwnerContact',
        recipeInfos: this.recipe
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

