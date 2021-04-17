import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  imageApiUrl: string = environment.apiBaseUrl + 'images/loading-loader.svg';

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      //console.log(v);
      this.loading = v;
    });

  }
  ngOnInit() {
  }

}
