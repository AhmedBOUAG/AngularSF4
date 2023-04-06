import { Image } from './../../models/image';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../recipe/recipe';
import { CommonUtils } from '../../Utils/CommonUtils';
import { RecipeService } from '../../services/recipe.service';
import { MessageHandlerService } from '../../services/message-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sharing',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipeToUpdate: Recipe = new Recipe;

  @Output('handleRecipeForm') handleFormEvent = new EventEmitter<any>();
  @Output() handleFileInput = new EventEmitter();
  @Output() deleteImg = new EventEmitter<number>();
  publishIt: boolean = true;
  state: string;
  isEdit: boolean = false;
  thumbnails: Array<Image> = [];
  deletedThumbnails: number[] = [];
  public operationTitle: string = 'Informations de la recette:';
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(15)]),
    subtitle: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    zip: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]),
    price: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
    deletedThumbnails: new FormControl<number[]>([]),
    state: new FormControl('')
  });
  uploadImagesDir = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  warning_last_image = CommonUtils.LAST_IMAGE_WARNING;
  constructor(
    public dialogRef: MatDialogRef<RecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RecipeService: RecipeService,
    private mhs: MessageHandlerService
  ) {
    if (Object.keys(data).length !== 0) {
      this.recipeToUpdate = data.recipe;
      this.thumbnails = data.recipe.images;
      data.recipe.images = [];
      this.recipeForm.patchValue(data.recipe);
      this.operationTitle = 'Modifier cette recette';
      this.isEdit = true;
      this.publishIt = CommonUtils.PUBLISHED === data.recipe.state ?? false;
    }
  }

  ngOnInit(): void {
    // Remove validator to uploadFile (images field) in edit case
    if (this.recipeForm.get('images') && this.isEdit) {
      this.recipeForm.get('images')!.clearValidators();
      this.recipeForm.get('images')!.updateValueAndValidity();
    }

  }

  onChangeState(event: boolean) {
    this.recipeForm.patchValue({ state: event ? CommonUtils.PUBLISHED : CommonUtils.DRAFT })
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
        ///this.dialogRef.close('create');
      },
      (err) => {
        this.errorHandler(err);
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
    this.dialogRef.close('modif');
    if (this.deletedThumbnails) {
      this.recipeForm.patchValue({
        deletedThumbnails: this.deletedThumbnails
      });
    }
    this.RecipeService.update(this.recipeToUpdate.id, this.recipeForm.value).subscribe(
      (res: Recipe[]) => {
      },
      (err) => {
        this.errorHandler(err);
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
  errorHandler(err: any) {
    console.log(err);
  }
  closeModal() {
    this.dialogRef.close();
  }

}
