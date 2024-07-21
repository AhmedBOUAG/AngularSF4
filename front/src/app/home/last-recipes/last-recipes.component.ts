import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../../recipe/recipe';
import { CommonUtils } from '../../Utils/CommonUtils';
import { RecipeService } from '../../services/recipe.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { register } from 'swiper/element/bundle';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import SwiperCore from 'swiper';


register();

@Component({
  selector: 'app-last-recipes',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './last-recipes.component.html',
  styleUrls: ['./last-recipes.component.css'],
})
export class LastRecipesComponent implements OnInit {
  @ViewChild('swiper') swiper: ElementRef<any>;
  destroy$: Subject<void> = new Subject<void>();
  public recipes: Recipe[];
  isLoaded = false;
  commonUtils = CommonUtils;
  dirUploadedImages = CommonUtils.UPLOAD_IMAGES_DIRECTORY;

  constructor(
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.recipeService.getLatestRecipesPosted().pipe(takeUntil(this.destroy$)).subscribe((recipe: any) => {
      this.recipes = recipe[CommonUtils.RESPONSE_ARRAY_KEY];
    }, (err: any) => {
      console.log(err);
    },
      () => {
        setTimeout(() => {
          this.isLoaded = true;
        }, 2000);

      });

  }

  getCategoryName(categoryId: any): string | undefined {
    const categName = CommonUtils.recipeCategory.find((cat: any) => cat.id === categoryId);

    return categName?.type;
  }
}
