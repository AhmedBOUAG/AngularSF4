import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DfmCheckGuard } from './dfm-check.guard';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule),
    canActivate: [DfmCheckGuard]
  },
  {
    path: 'inscription',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
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
