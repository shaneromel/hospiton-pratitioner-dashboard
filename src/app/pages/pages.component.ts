import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { APIService } from '../API.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;

  constructor(private apiService:APIService){}

  ngOnInit(){
    Auth.currentAuthenticatedUser({bypassCache:true}).then(user=>{
      console.log(user);

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
