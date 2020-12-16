import { PropertiesService } from './../services/properties.service';
import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from '../interfaces/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  propertiesSubscription: Subscription = new Subscription();

  constructor(private propertiesService: PropertiesService) {      
  }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    //this.properties = this.propertiesService.getProperties();

    this.propertiesSubscription.add(
      this.propertiesService.getProperties().subscribe((res: Property[]) => {
        return (this.properties = res);
      })
    );
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
