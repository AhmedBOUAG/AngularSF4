import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  dataFormCreate: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
  }

  initPropertiesForm() {
    this.dataFormCreate = this.formBuilder.group({
      title: '',
      subtitle: '',
      category: '',
      description: '',
      city: '',
      zip: '',
      price: ''

    });
  }

  onSubmitDataFormCreate() {
    console.log(this.dataFormCreate.value);
  }

}
