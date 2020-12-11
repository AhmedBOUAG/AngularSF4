import { PropertiesService } from './../services/properties.service';
import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties = [];
  propertiesSubscription: Subscription | any;

  constructor(
    private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    /* this.propertiesService.getProperties().then(
      (data: any) => {
        console.log(data);
        this.properties = data;
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    ) */
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProporties();
  }

  getAvailability(index: number): string {
    if (this.properties[index].isAvailable) {
      return 'En stock!';
    } else {
      return 'En rupture!';
    }
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();

  }
}
