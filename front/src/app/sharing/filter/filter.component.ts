import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeComponent } from '../forms/recipe.component';
import { IFilterSearch } from 'src/app/models/interfaces/IFilterSearch';
import { CommonUtils } from 'src/app/Utils/CommonUtils';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  orders: IFilterSearch = {};
  orderPrice: any[] = [];
  filterModalTitle: string = CommonUtils.FILTER_MODAL_TITLE;
  categories: any = {};

  constructor(
    public dialogRef: MatDialogRef<RecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
    if (Object.keys(data.filter).length !== 0) {
      this.filterForm = this.formBuilder.group({
        price: new FormControl(data.filter?.order),
        title: new FormControl(data.filter?.criteria?.title),
        subtitle: new FormControl(data.filter?.criteria?.subtitle),
        city: new FormControl(data.filter?.criteria?.city),
        category: new FormControl(data.filter?.criteria?.category),
      });
    }
  }

  ngOnInit(): void {
    this.categories = CommonUtils.recipeCategory;
    this.orders.price = [{
      label: 'Prix croissant',
      value: 'ASC',
    },
    {
      label: 'Prix décroissant',
      value: 'DESC',
    }];
    this.orderPrice = this.orders.price;
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      price: new FormControl(''),
      title: new FormControl(''),
      subtitle: new FormControl(''),
      city: new FormControl(''),
      category: new FormControl([]),
    });
  }

  resetFilter() {
    this.initForm();
    this.orders.price = [];
    this.orderPrice = [];
    this.orders = {};
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.dialogRef.close(this.filterForm.value);
    } else {
      console.log("Le formulaire est invalide.");
    }
  }
}
