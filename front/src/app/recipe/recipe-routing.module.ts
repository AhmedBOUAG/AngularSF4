import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";
import { AllRecipesComponent } from "./all-recipes/all-recipes.component";

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
        path: '**',
        component: AllRecipesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: []
})
export class RecipeRoutingModule { }
