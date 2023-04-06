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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FilterStatusPipe } from '../pipe/filter-status.pipe';


@NgModule({
  imports: [
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    MatSlideToggleModule,
  ],
  providers: [RecipeService],
  declarations: [
    MyRecipesComponent,
    RecipeCreateComponent,
    RecipeComponent,
    FilterStatusPipe
  ],
  bootstrap: [RecipeComponent]
})
export class RecipeModule { }
