import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/recipe/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { CommonUtils } from 'src/app/Utils/CommonUtils';



@Component({
  selector: 'app-last-recipes',
  templateUrl: './last-recipes.component.html',
  styleUrls: ['./last-recipes.component.css'],
})
export class LastRecipesComponent implements OnInit {
  @ViewChild('swiper') swiper: ElementRef;
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
    this.recipeService.getLastThreeRecipies().pipe(takeUntil(this.destroy$)).subscribe((recipe: any) => {
      this.recipes = recipe;
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
