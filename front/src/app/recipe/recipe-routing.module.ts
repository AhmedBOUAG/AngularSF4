import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "my-recipes",
                component: MyRecipesComponent
            },
            {
                path: "create",
                component: RecipeCreateComponent
            },
            {
                path: "**",
                redirectTo: "my-recipes"
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: []
})
export class RecipeRoutingModule { }
