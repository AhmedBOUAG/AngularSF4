import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/recipe/recipe';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title: string;

  constructor(public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subject: string,
      recipeInfos: Recipe
    }) {
    this.title = data.subject === 'recipeOwnerContact'
      ? 'Mise en relation avec ' + data.recipeInfos.creator.username
      : 'Signalement de recette';
  }

  ngOnInit(): void {
  }

}
