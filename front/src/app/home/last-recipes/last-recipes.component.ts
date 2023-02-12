import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { CommonUtils } from 'src/app/Utils/CommonUtils';

@Component({
  selector: 'app-last-recipes',
  templateUrl: './last-recipes.component.html',
  styleUrls: ['./last-recipes.component.css']
})
export class LastRecipesComponent implements OnInit {
  public recipes: Recipe[];
  dirUploadedImages = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  constructor(
    private  recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.recipeService.getLastThreeRecipies().subscribe((recipe:any) => {
      console.log(recipe);
      this.recipes = recipe;
    });
  }

}
