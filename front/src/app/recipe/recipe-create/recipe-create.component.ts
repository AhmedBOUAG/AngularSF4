import { RecipeService } from '../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { MessageHandlerService } from '../../services/message-handler.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  recipe: Recipe | any = {};
  messageHandler: any = {};

  constructor(
    private RecipeService: RecipeService, private mhs: MessageHandlerService
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(event: any) {
    this.recipe.images = event.target.files;
  }

  onSubmitDataFormCreate(f: any): any {
    this.recipe.title = f.form.value.title;
    this.recipe.subtitle = f.form.value.subtitle;
    this.recipe.category = f.form.value.category;
    this.recipe.city = f.form.value.city;
    this.recipe.zip = f.form.value.zip;
    this.recipe.price = f.form.value.price;
    this.recipe.description = f.form.value.description;

    this.RecipeService.create(this.recipe)
      .subscribe(
        (res: Recipe[]) => {
          let message = 'Votre recette a été créee avec succès.'
          this.messageHandler = this.mhs.display('CREATE', message);
          setTimeout(() => this.messageHandler = {}, 7000);
          f.reset();
        },
        (err) => {
          this.messageHandler = this.mhs.display(err, '', true);
        }
      );
  }
}
