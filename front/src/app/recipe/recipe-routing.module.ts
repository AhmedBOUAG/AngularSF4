import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";
import { AllRecipesComponent } from "./all-recipes/all-recipes.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";

const routes: Routes = [
    {
        path: '',
        component: AllRecipesComponent
    },
    {
        path: 'my-recipes',
        component: MyRecipesComponent
    },
    {
        path: 'create',
        component: RecipeCreateComponent
    },
    {
        path: 'details/:uuid',
        component: RecipeDetailsComponent
    },
    {
        path: '**',
        component: AllRecipesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: []
})
export class RecipeRoutingModule { }
