import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { RecipeComponent } from '../sharing/forms/recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    RippleModule
  ],
  providers: [RecipeService],
  declarations: [
    MyRecipesComponent,
    RecipeCreateComponent,
    RecipeComponent
  ],
  bootstrap: []
})
export class RecipeModule { }
