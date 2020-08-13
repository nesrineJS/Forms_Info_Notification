import { Component, OnInit, ViewEncapsulation, ViewChild,Inject, Input, HostListener, Injectable, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm} from '@angular/forms';
import { FormsService } from './forms.service';
enum CheckBoxType { MODIFY_MARIE, MODIFY_CELEBATAIRE, NONE };
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';


@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})



export class FormsComponent implements OnInit {
 
  state:any;
  
  values = '';
  valueskey ='';
  userDetailsForm: FormGroup;
  userCheckForm: FormGroup;
  

  codeInscription:any;
  fullname:any;
  msisdn:any;
  service:any;
  civility:any;
  job:any;
  gender:any;
  param_1:any;
  param_2:any;
  param_3:any;
  param_4:any;
  language:any;
  city:any;
  zip_code:any;
  date_birth:any;

  code:any;
  id_code:any;
  countries:any;
  libelle:any;

  code_check:any;
  code_msisdn:any;

  States = ['Marié(e)','Célibataire']

  lstSecteurChecked: string = ";";

  InscriptionBack : boolean= false;
  InscriptionCode : boolean=false;
  checkboxFormControl = new FormControl(true);
  
  value = 1;

  secteurs = [
    {name:"Transport",value:"Transport"},
    {name:"Carburant",value:"Carburant"},
    {name:"Secteur public",value:"public"},
    {name:"Education",value:"Education"},
    {name:"Routes coupées",value:"Routes"},
    {name:"Tous",value:"Tous"}
  ];

  _code:any;
  _msisdn:any;
  closeResult: string;

  animal: string;
  name: string;
  codeObj:any;
  date = new Date();

  @ViewChild('ref') ref;
  @ViewChild('ref2') ref2;
  @ViewChild('ref3') ref3;
  @ViewChild('refs') refs;

  cdt1:boolean 
  cdt2:boolean 
  cdt3:boolean 
  nettoyage_msg ="";
  texterr ="";

  scrolldelay:any;

  value1:any;
  value2:any;
  value3:any;
  value4:any;

  msisdn1:any;
  msisdn2:any;
  msisdn3:any;
  valueList=[''];
  allZipCode:any;
  allMobile:any;
  indicatif='216';
  allMobileCheck:any;

  InscriptionBtn:boolean;
  @Input() checked: boolean
  checkedVariable =  true;
  fieldvalue:any;
  isDisabled: boolean=false;
  clicked :boolean;

  lstConditionChecked: string =";YES_USE_DATA;YES_PUB_SMS;"

  /************ Checked Form ************ */

   isCivilityChecked: boolean = false;
   isSecteurChecked: boolean = false;
   isUseConditionChecked: boolean = true;
   isMessageHidden: boolean = true;
   isCodeMessageHidden : boolean =true; 
   isCodeAlertMessageHidden: boolean = true;
   isBtnInscription :boolean =true;
   isRecaptachHidden :boolean =false;



  /************ Checked Form ************ */

  init : boolean;
  StorageMsisdn :any;


  confirmHidden: boolean = false;
  
  titleHidden : boolean =false;
  testHidden: boolean =false;
  @ViewChild('ChangeVble') ChangeVble;
  MsgAlert:any;
  isMessageAlert : boolean =false;


  /******************CAPTCHA VARIABLES********************** */
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public useGlobalDomain: boolean = false;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';

  public aFormGroup: FormGroup;
  public readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1'; 
  //6LflRb4UAAAAADSwgTwo2zIqBOXV4yrIIx1zCHop key pour--inforgreve.tn


  
  constructor( public rest: FormsService, public datePipe: DatePipe, public router: Router , public route: ActivatedRoute, 
    public cdr: ChangeDetectorRef, public formBuilder: FormBuilder) {
    //window.setInterval(()=>this.checkedVariable=!this.checkedVariable, 3600000);

      var elementMsisdn = localStorage.getItem('StorageMsisdn');

      if(elementMsisdn && elementMsisdn.length > 7 && this.router.url == "/inscription"  )
      {
        this.router.navigate(['/confirmation'])
      }
      

  }
  
    ngOnInit() {
     
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required]
      });

      this.isCivilityChecked = false;
      this.isSecteurChecked = false;
      this.isUseConditionChecked = true;
      this.isMessageHidden = true;
     // this.isBtnInscription =true;

    }

    /*clearForm(event){
      (<HTMLFormElement>document.getElementById("formClean")).reset();

      console.log("FORM CLEANED !!")
     }*/

     /*MoveToCode(): void {
       if(this.code_check == this.id_code){

       // console.log('id_code :'+this.id_code);
       // console.log('code_check :'+this.code_check);

       setInterval(() => {
        this.router.navigate(['/confirmation/'])
        }, 180000);
        
      }
    }*/

    refresh(): void {
      if(this.code_check == this.id_code){

       //console.log('id_code :'+this.id_code);
      // console.log('code_check :'+this.code_check);

        setTimeout(function(){ location.reload(); }, 180000);
     }
   }
 

    StateRadioButtonChange(state){
       this.state=state;

       this.isCivilityChecked = true;

       //console.log('civility: '+this.state)
    }


    UseConditionCheckBoxChange(event){
      
      if(event.target.checked)
      {
        this.isUseConditionChecked = true;
      }
      else
      {
        this.isUseConditionChecked = false;
      }

      //console.log(this.isUseConditionChecked)
   }

   ConditionChechBoxChange(chkCondition, event)
   {
     if(event.target.checked)
     {
       this.lstConditionChecked = this.lstConditionChecked + chkCondition + ";"
     }
     else
     {
       this.lstConditionChecked = this.lstConditionChecked.replace(chkCondition + ";", "") 
     }

    
   }


    SecteurChechBoxChange(chkSeceteur, event)
    {
      if(event.target.checked)
      {
        this.lstSecteurChecked = this.lstSecteurChecked + chkSeceteur + ";"
      }
      else
      {
        this.lstSecteurChecked = this.lstSecteurChecked.replace(chkSeceteur + ";", "") 
      }

      if(this.lstSecteurChecked.length > 1)
      {
          this.isSecteurChecked = true;
      }
      else
      {
          this.isSecteurChecked = false;
      }

      //console.log(this.lstSecteurChecked);
    }

    GetZipCode(value1, value2, value3, value4){
      this.allZipCode=value1+value2+value3+value4

    }

    GetMobile(msisdn1, msisdn2, msisdn3){
    
      this.allMobile= this.indicatif+msisdn1+msisdn2 +msisdn3 
      this.allMobileCheck =true;
 
    }


    GetInscriptionInsert(state,cd1)  {

      //AMINE
      this.service='greve'
      this.gender='';
      this.param_2='';
      this.param_3= this.lstConditionChecked;
      this.param_4='';
      this.language ='';
      
  
      this.date_birth=this.datePipe.transform(this.date, 'yyyy-MM-dd 00:00:00').toString();


      this.code_msisdn = this.allMobile;

      this.rest.InscriptionInsert(this.fullname,this.allMobile,this.service,state,this.job,this.gender, this.lstSecteurChecked, 
          this.param_2, this.param_3, this.param_4,this.language,this.city,this.allZipCode, this.date_birth).subscribe(respond => {
          // console.log(respond)
         // console.log(respond.length)
            if( respond.length > 0){
            this.id_code=respond[0].id_code;
            this.msisdn=respond[0].msisdn;

            this.StorageMsisdn =respond[0].msisdn;

           localStorage.setItem('StorageMsisdn',JSON.parse(this.StorageMsisdn));


           // console.log('StorageMsisdn :'+ this.StorageMsisdn)

          this.rest.SendCodeBySMS(respond[0].msisdn, respond[0].id_code , respond[0].id_inscription).subscribe(respond2 => {      

          });  

          var elementMsisdn = localStorage.getItem('StorageMsisdn');

          this.router.navigate(['/confirmation'])
           
        }else {
          
          this.isMessageAlert =true;
         // console.log(this.isMessageAlert)
          this.MsgAlert ='Le numéro de mobile est déjà inscrit.';
         // console.log('already there')
        }});  
       
      }



      GetCodeCheck2(id_code, msisdn)  {

      
        var mobile = msisdn;
      
      if(msisdn.length == 8)
      {
          mobile = '216' + mobile;
      }

        this.rest.CodeCheck(id_code.toString(),mobile.toString()).subscribe(respond => {

          if(respond[0].pr_inscription_check == 1) 
          {
            this.isCodeMessageHidden= false;
            this.confirmHidden = false; 
            this.isCodeAlertMessageHidden = true;
            localStorage.clear();

           setInterval(() => {
              this.router.navigate(['/services/'])
              }, 30000);
              window.scroll(0, 500);

          }
          else
          {
            this.isCodeAlertMessageHidden = false;
          }

        });
        
        this.InscriptionCode =true;
      }

    
    ChangeCodeText()
    {
      this.isCodeAlertMessageHidden = true;
    }

    show(state){
      //console.log(state)
    }


    GetCountrySearch(event: any)  {
    
      //this.values+event.target.value ;
          
       this.rest.CountrySearch( this.values+event.target.value ).subscribe(respond => {
         this.countries=respond;
       
       })
     }

    selectedCity(libelle){
     this.libelle = libelle
    }


    public inputValidator(event: any) {
       const pattern = /^[a-z\d\-_\s]+$/i;   

      if (!pattern.test(event.target.value)) { ///[^a-zA-Z]/g
        event.target.value = event.target.value.replace(/^[a-z\d\-_\s]+$/i, "");

      }
    }

    public inputValidators(event: any) {
      const pattern = /^[0-9]*$/;   
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
  
      }
    }


    OnlyNumbers(event): boolean {    
    let patt = /^([a-z A-Z])$/;
    let result = patt.test(event.key);
    return result;

    }


    /******************************************CAPTCHAA**********************************************************/

    handleReset(): void {
      this.captchaSuccess = false;
      this.captchaResponse = undefined;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
    }

    handleExpire(): void {
      this.captchaSuccess = false;
      this.captchaIsExpired = true;
      this.cdr.detectChanges();
    }
  
    handleLoad(): void {
      this.captchaIsLoaded = true;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
    }
  

    handleSuccess(captchaResponse: string): void {
      this.captchaSuccess = true;
      this.captchaResponse = captchaResponse;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
     // console.log('recaptcha clicked and verified !');
      this.isBtnInscription =false;
      this.isRecaptachHidden =true;

    }
  
   }


   
  

