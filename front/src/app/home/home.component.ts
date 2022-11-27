import { Component, OnInit } from '@angular/core';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent extends AngularTypewriterEffectModule implements OnInit {
  list = ["Bienvenue sur le site DuFaitMaison.com,",
    "premier site de partage de recette entre particulier.",
    "Proposez vos recettes à d'autres internautes à travers le web!"
  ]
  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
