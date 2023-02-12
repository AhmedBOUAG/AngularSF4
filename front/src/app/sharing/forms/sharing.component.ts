import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../recipe/recipe';
import { CommonUtils } from '../../Utils/CommonUtils';
import { RecipeService } from '../../services/recipe.service';
import { MessageHandlerService } from '../../services/message-handler.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../models/image';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {

  @Input() recipeToUpdate: Recipe = new Recipe;

  @Output('handleRecipeForm') handleFormEvent = new EventEmitter<any>();
  @Output() handleFileInput = new EventEmitter();
  @Output() deleteImg = new EventEmitter<number>();
  isEdit: boolean = false;
  thumbnails: Array<Image> = [];
  deletedThumbnails: Array<number> = [];
  public operationTitle: string = 'Ajouter une nouvelle recette';
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(15)]),
    subtitle: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required, Validators.minLength(15)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    zip: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
    deletedThumbnails: new FormControl([])
  });
  uploadImagesDir = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  constructor(
      public dialogRef: MatDialogRef<SharingComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private RecipeService: RecipeService,
      private mhs: MessageHandlerService
    ) {
    if (data) {
      this.recipeToUpdate = data.recipe;
      this.thumbnails = data.recipe.images;
      data.recipe.images = [];
      this.recipeForm.patchValue(data.recipe);
      this.isEdit = true;
    }
   }

  ngOnInit(): void {
    if (this.isEdit) {
      this.operationTitle = 'Modifier cette recette'
    }
  }

  get f() {
    return this.recipeForm.controls;
  }
  deleteThumbnailRecipe(imgId: number) {
    this.deleteImg.emit(imgId);
  }
  createRecipe() {
    this.RecipeService.create(this.recipeForm.value).subscribe(
      (res: Recipe[]) => {
        this.dialogRef.close('create');
      },
      (err) => {
        //this.errorHandler(err);
      }
    );
  }
  saveRecipe() {
    if (this.isEdit) {
      this.saveEditRecipe();
    } else {
      this.createRecipe();
    }
  }

  saveEditRecipe(): any {
    if (this.deletedThumbnails) {
      this.recipeForm.patchValue({
        deletedThumbnails: this.deletedThumbnails
      });
    }
    this.RecipeService.update(this.recipeToUpdate.id, this.recipeForm.value).subscribe(
      (res: Recipe[]) => {
        this.dialogRef.close('modif');
      },
      (err) => {
        //this.errorHandler(err);
      }
    );
  }

  preDeleteThumbnail(id: number) {
    this.deletedThumbnails.push(id);
    const indexImageToRemove = this.thumbnails.findIndex(thumbnail => id === thumbnail.id);
    this.thumbnails.splice(indexImageToRemove, 1);
  }

  loadFile(event: any) {
    this.recipeForm.patchValue({
      images: event.target.files
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
