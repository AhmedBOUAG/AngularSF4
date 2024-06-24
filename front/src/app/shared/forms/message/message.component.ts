import { Component, Inject, OnInit } from '@angular/core';
import { AbstractForm } from '../AbstractForm';
import { FormService } from 'src/app/services/form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/recipe/recipe';
import { CommonUtils } from 'src/app/Utils/CommonUtils';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends AbstractForm implements OnInit {

  public recipe: Recipe;
  public title: string = 'Mise en relation avec ';

  constructor(
    formService: FormService,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subject: string,
      recipeInfos: Recipe
    },
    private messageService: MessageService
  ) {
    super(
      formService,
      [
        { key: 'content', value: '', validators: [] }
      ]
    );
    this.recipe = data.recipeInfos;
  }

  ngOnInit(): void {
    console.log('recipe', this.recipe);
    console.log(this.getImage());
  }
  submit() {
    if (this.form.valid && this.form.value.content !== '') {
      const message = this.messageService.hydrateMessagesIri(this.form, this.recipe);
      this.messageService.send(message);
      this.dialogRef.close();
    }
  }
  getImage() {
    return this.recipe.images.length > 0 ? CommonUtils.UPLOAD_IMAGES_DIRECTORY + this.recipe.images[0].name : CommonUtils.NO_AVAILABLE_IMAGE;
  }

  onnoclick(): void {
    this.dialogRef.close();
  }
}
