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

  handleFileInput(event:any)
  {
    this.recette.images = event.target.files;
  }

  onSubmitDataFormCreate(f: any): any {
    this.recette.title = f.form.value.title;
    this.recette.subtitle = f.form.value.subtitle;
    this.recette.category = f.form.value.category;
    this.recette.city = f.form.value.city;
    this.recette.zip = f.form.value.zip;
    this.recette.price = f.form.value.price;
    this.recette.description = f.form.value.description;

    this.RecetteService.store(this.recette)
      .subscribe(
        (res: Recette[]) => {
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
