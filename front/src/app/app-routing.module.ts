import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './recipe/my-recipes/my-recipes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  //{
   // path: 'recipe',
   // children: [
      {
        path: 'my-recipes',
        component: MyRecipesComponent,
      },
      {
        path: 'create',
        component: RecipeCreateComponent,
      },
   // ],
  //},
  {
    path: 'inscription',
    component: RegistrationComponent
  },
  {
    path: 'my-recipes',
    component: MyRecipesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
// Not found 404
  {
    path: '**',
    redirectTo: '', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
