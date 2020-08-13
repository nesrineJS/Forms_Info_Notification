import { Component, OnInit, Input, ChangeDetectorRef, } from '@angular/core';
import { FormsComponent } from '../forms/forms.component';
import { FormsService } from '../forms/forms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent   extends FormsComponent implements OnInit {

mobileIndicatif= "216";

  constructor(public rest: FormsService, public datePipe: DatePipe, public router: Router , public route : ActivatedRoute, 
    public CodeSend :FormsService,  public cdr: ChangeDetectorRef, public formBuilder: FormBuilder, private titleService:Title, 
      private meta: Meta) {

    super( rest, datePipe, router, route, cdr,formBuilder );
   // this.titleService.setTitle("Confirmation" +'  \xa0\xa0' + "de l`inscription au service Info grève");
   this.titleService.setTitle("Confirmation de l`inscription au service Info grève");
    window.scroll(0, 500);


      if(localStorage.getItem('StorageMsisdn'))
      {
        this.msisdn=JSON.parse(localStorage.getItem('StorageMsisdn')).toString();

        if(this.msisdn && this.msisdn.length == 11 && (this.mobileIndicatif) ==  (this.msisdn.substring(0,3))){
          this.msisdn =this.msisdn.substring(3);
        }
      }

   }



  ngOnInit() {

  /* this.meta.addTags([
      {name: 'keywords', content: "Grève, information, alerte, Tunisie, routes coupées, carburant, essence, éducation, secteur public, poste, transport, alerte par SMS, confirmation par SMS"},
      {name: 'description', content: "Info grève est un service d'alertes par SMS, sur les grèves prévues et confirmées ainsi que les coupures de routes, en Tunisie. Prix: 70 millimes / SMS reçu."},
      {name: 'author', content: "Info grève "}
      ]);

      const author = this.meta.getTag('name=author');
      console.log('author :'+author.content);
      const description = this.meta.getTag('name=description');
      console.log('description :'+description.content);
      const keywords = this.meta.getTag('name=keywords');
      console.log('keywords :'+keywords.content);*/
      


    this.isCodeMessageHidden= true;  
    this.isCodeAlertMessageHidden = true;

    
  }

 ResendCode(){

    if(this.msisdn && (this.msisdn.length == 8 || this.msisdn.length == 11) )
    {
      
      var mobile = this.msisdn;
      
      if(this.msisdn.length == 8)
      {
          mobile = '216' + mobile;
      }
      
      this.rest.ResendCode(mobile.toString()).subscribe(respond => {
              if(respond && respond.length > 0)
              {
                this.rest.SendCodeBySMS(mobile.toString(), respond[0].id_code , respond[0].id_inscription).subscribe(respond2 => {});  
              }
        }); 
      }  
    } 

    NewInscription(){
      localStorage.clear();
      this.router.navigate(['/inscription'])
    }

}




