import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-messages',
  templateUrl: './read-messages.component.html',
  styleUrls: ['./read-messages.component.css']
})
export class ReadMessagesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    console.log('uuid', uuid)
  }

}
