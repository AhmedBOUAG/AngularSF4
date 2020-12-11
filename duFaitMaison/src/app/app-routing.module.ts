import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecetteComponent } from './recette/recette.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'recette', component: RecetteComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
