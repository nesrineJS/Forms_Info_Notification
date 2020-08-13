import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-termes',
  templateUrl: './termes.component.html',
  styleUrls: ['./termes.component.scss']
})
export class TermesComponent implements OnInit {

  constructor(private titleService:Title, private meta: Meta) { 
    this.titleService.setTitle("Termes D’utilisation");

  }

  ngOnInit() {
  }

}
