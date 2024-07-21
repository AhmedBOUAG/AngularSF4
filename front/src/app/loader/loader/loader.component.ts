import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  imageApiUrl: string = environment.apiBaseUrl + 'images/loading-loader.svg';

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

  }
  ngOnInit() {
  }

}
