import { RecetteService } from './../services/recette.service';
import { Component, OnInit } from '@angular/core';
import { Recette } from './recette';
import { MessageHandlerService } from './../services/message-handler.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  recette: Recette | any = {};
  messageHandler: any = {};

  constructor(
    private RecetteService: RecetteService, private mhs: MessageHandlerService
  ) {}

  ngOnInit(): void {
  }

  onSubmitDataFormCreate(f: any): any {
    this.RecetteService.store(f.form.value)
      .subscribe(
        (res: Recette[]) => {
          //this.recettes = res;
          this.messageHandler = this.mhs.display('CREATE');
          setTimeout(() => this.messageHandler = {}, 7000);
          f.reset();
        },
        (err) => {
          this.messageHandler = this.mhs.display(err, true);
         }
      );
  }



}
