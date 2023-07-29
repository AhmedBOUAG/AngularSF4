import { Router } from '@angular/router';
import { Image } from './../../models/image';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../recipe/recipe';
import { CommonUtils } from '../../Utils/CommonUtils';
import { RecipeService } from '../../services/recipe.service';
import { MessageHandlerService } from '../../services/message-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalityService } from '../../services/locality.service';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, of, switchMap, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() recipeToUpdate: Recipe = new Recipe;

  @Output('handleRecipeForm') handleFormEvent = new EventEmitter<any>();
  @Output() handleFileInput = new EventEmitter();
  @Output() deleteImg = new EventEmitter<number>();
  @Output() processEvent = new EventEmitter<string>();

  publishIt: boolean = true;
  isEdit: boolean = false;
  thumbnails: Array<Image> = [];
  deletedThumbnails: number[] = [];
  public operationTitle: string = 'Informations de la recette:';
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(15)]),
    subtitle: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    locality: new FormControl<number | null>(null),
    price: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
    deletedThumbnails: new FormControl<number[]>([]),
    status: new FormControl('published')
  });
  uploadImagesDir = CommonUtils.UPLOAD_IMAGES_DIRECTORY;
  warning_last_image = CommonUtils.LAST_IMAGE_WARNING;
  minLengthTerm = CommonUtils.MIN_LENTH_TERM;
  cities$: Observable<any>;
  citiesLoading = false;
  citiesInput$ = new Subject<string>();
  selectedCity: any;

  constructor(
    public dialogRef: MatDialogRef<RecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RecipeService: RecipeService,
    private mhs: MessageHandlerService,
    private router: Router,
    private localityService: LocalityService
  ) {

    if (Object.keys(data).length !== 0) {
      this.recipeToUpdate = data.recipe;
      this.thumbnails = data.recipe.images;
      data.recipe.images = [];
      this.recipeForm.patchValue(data.recipe);
      this.operationTitle = CommonUtils.EDIT_RECIPE_TITLE;
      this.isEdit = true;
      this.publishIt = CommonUtils.PUBLISHED === data.recipe.status ?? false;
    }
  }

  ngOnInit(): void {
    this.loadCities();
    // Remove validator to uploadFile (images field) in edit case
    if (this.recipeForm.get('images') && this.isEdit) {
      this.recipeForm.get('images')!.clearValidators();
      this.recipeForm.get('images')!.updateValueAndValidity();
    }

  }

  loadCities() {
    this.cities$ = concat(
      of([]), // default items
      this.citiesInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        takeUntil(this.destroy$),
        tap(() => this.citiesLoading = true),
        switchMap(term => {

          return this.localityService.getByTerm(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.citiesLoading = false)
          )
        })
      )
    );

  }

  onChangeStatus(event: boolean) {
    this.recipeForm.patchValue({ status: event ? CommonUtils.PUBLISHED : CommonUtils.DRAFT })
  }
  get f() {
    return this.recipeForm.controls;
  }
  deleteThumbnailRecipe(imgId: number) {
    this.deleteImg.emit(imgId);
  }
  createRecipe() {
    this.RecipeService
      .create(this.recipeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Recipe[]) => {
          this.processEvent.emit(CommonUtils.CREATE);
          this.recipeForm.reset();
          setTimeout(() => {
            this.router.navigate(['my-recipes']);
          }, 3000);
        },
        (err) => {
          this.processEvent.emit(err);
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
    if (this.deletedThumbnails) {
      this.recipeForm.patchValue({
        deletedThumbnails: this.deletedThumbnails
      });
    }
    this.RecipeService
      .update(this.recipeToUpdate.id, this.recipeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Recipe[]) => {
          this.dialogRef.close(CommonUtils.MODIF);
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
