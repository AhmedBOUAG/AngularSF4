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
}
