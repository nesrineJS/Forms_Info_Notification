import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-politiques',
  templateUrl: './politiques.component.html',
  styleUrls: ['./politiques.component.scss']
})
export class PolitiquesComponent implements OnInit {

  constructor(private titleService:Title, private meta: Meta) { 
    this.titleService.setTitle("Politique de Confidentialité");

  }

  ngOnInit() {
  }

}
