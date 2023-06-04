import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { SpeedDialModule } from 'primeng/speeddial';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SharingModule } from '../sharing/sharing.module';

@NgModule({
  imports: [
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    MatSlideToggleModule,
    SpeedDialModule,
    DataViewModule,
    DropdownModule,
    TagModule,
    SharingModule,
    PaginatorModule
  ],
  providers: [RecipeService, MessageService],
  declarations: [
    MyRecipesComponent,
    RecipeCreateComponent,
    RecipeComponent,
    FilterStatusPipe,
    AllRecipesComponent
  ],
  bootstrap: [RecipeComponent, AllRecipesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipeModule { }
