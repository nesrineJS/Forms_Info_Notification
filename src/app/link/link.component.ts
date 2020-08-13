import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../forms/forms.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  msg = ''
  id_inscription : any;
  id_code : any;
  msg_error : any;
  isCodeAlertMessageHidden = true;
  isCodeMessageHidden = true;
  constructor( public route: ActivatedRoute, public router: Router, public rest:FormsService, private titleService:Title, private meta: Meta) {

   }

  ngOnInit() {
    this.msg = this.route.snapshot.paramMap.get("msg");
     let url=this.router.url;
      //console.log(url)

    //split msg

    var splitted = this.msg.split("-");
    
    if(splitted.length > 1)
    {
      this.id_code = splitted[0];
      this.id_inscription = splitted[1];

      this.CheckInscription();
    }
    else
    {
      this.isCodeAlertMessageHidden = false;
      this.isCodeMessageHidden = true;
    }

    //console.log(this.id_code)
   // console.log(this.id_inscription)
    
    //this.router.navigate(['/c',this.msg])

  }


  CheckInscription(){

    this.rest.CheckInscription(this.id_code.toString(),this.id_inscription.toString()).subscribe(respond => {
      
      if(respond && respond.length > 0 && respond[0].pr_inscription_check_t2 == 1)
      {

        this.titleService.setTitle("Confirmation d'inscription !!!");

        this.isCodeAlertMessageHidden = true;
        this.isCodeMessageHidden = false;

        localStorage.clear();

        setInterval(() => {
          this.router.navigate(['/services'])
          }, 5000);
      }
      else
      {
        this.titleService.setTitle("Erreur !!!");

        this.isCodeAlertMessageHidden = false;
        this.isCodeMessageHidden = true;
      }
    });
  } 

  NewInscription()
  {
    localStorage.clear();
    this.router.navigate(['/inscription'])
  }



}
