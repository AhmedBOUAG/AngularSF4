import { RecetteService } from './../services/recette.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Recette } from './recette';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  recette: Recette | any = {};
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,  private RecetteService: RecetteService
  ) {}

  ngOnInit(): void {
  }

  onSubmitDataFormCreate(f: any): any {
    this.error = '';
    this.success = '';
    this.RecetteService.store(f.form.value)
      .subscribe(
        (res: Recette[]) => {
          //this.recettes = res;
          this.success = 'Created successfully';
          f.reset();
        },
        (err) => this.error = err
      );
  }



}
