import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { SharingComponent } from '../sharing/forms/sharing.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
  imports: [
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [RecipeService],
  declarations: [
    MyRecipesComponent,
    RecipeCreateComponent,
    SharingComponent
  ],
  bootstrap: []
})
export class RecipeModule { }
