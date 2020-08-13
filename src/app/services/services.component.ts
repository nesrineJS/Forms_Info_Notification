import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Autres Services");

   }

  ngOnInit() {
  }

}
