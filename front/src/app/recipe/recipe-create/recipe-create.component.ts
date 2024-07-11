import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { MessageHandlerService } from '../../services/message-handler.service';
import { MessageService } from 'primeng/api';
import { CommonUtils } from '../../Utils/CommonUtils';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
})

export class RecipeCreateComponent implements OnInit {

  recipe: Recipe | any = {};
  messageHandler: any = {};

  constructor(
    private mhs: MessageHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  resultProcess(event: string) {
    if (CommonUtils.CREATE === event) {
      this.messageService.add(this.mhs.display(CommonUtils.CREATE, CommonUtils.messageToast.recipeCreated))
    } else {
      this.messageService.add(this.mhs.display(event, '', true))
    }
  }
}
