import { Component, OnInit } from '@angular/core';

import { PagesMenu } from './pages-menu';
import { APIService } from '../API.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="menu" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu;

  constructor(private apiService:APIService){}

  ngOnInit(){
    Auth.currentAuthenticatedUser({bypassCache:true}).then(user=>{
      console.log(user);

      switch(user.attributes["custom:type"]){
        case "DOCTOR":
          this.menu=PagesMenu.DOCTOR_ITEMS;
          break;
        case "PATIENT":
          this.menu=PagesMenu.HOSPITAL_ITEMS;
          break;
        default:
          this.menu=PagesMenu.DOCTOR_ITEMS;
      }

      this.apiService.GetDoctorById(user.username).then(doctor=>{
        console.log(doctor);
        if(doctor.appointment_type==="SLOT"){
          this.menu=this.menu.map(a=>{
            if(a.title==="Appointments"){
              a.children[0].link="/pages/appointments/manage-slot-appointments"
            }

            return a;

          })
        }
      })

    })
  }

}
