import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { Auth } from 'aws-amplify';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule:any;
  availableDays:string[];
  days:string[];
  doctor:any;
  selectedDay:string;

  start1:any;
  end1:any;
  start2:any;
  end2:any;

  morning:boolean;
  evening:boolean;

  constructor(private apiService:APIService, private toastrService:ToastrService) { 
    this.schedule={
      mon:[]
    };

    this.availableDays=[];
    this.days=["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  }

  slotsSelected(slot, event){
    switch(slot){
      case "morning":
        this.morning=event;
        break;
      case "evening":
        this.evening=event;
        break;
    }
  }

  ngOnInit() {
    Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
      this.apiService.GetDoctorById(data.username).then(doctor=>{
        this.doctor=doctor;
        if(this.doctor.schedule){
          this.days.forEach(a=>{
            if(this.doctor.schedule[a]){
              this.availableDays.push(a);
            }
          })
        }
      }).catch(err=>{
        this.toastrService.showToast("danger","Error", err.message);
      })
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  selectDay(day){
    if(this.selectedDay!=day){
      this.selectedDay=day;
      const schedule=this.doctor.schedule[day];
      console.log(schedule)
      if(schedule[0] && schedule[1]){
        this.start1=this.convertMinutes(schedule[0]);
        this.end1=this.convertMinutes(schedule[1]);
        this.morning=true;
      }else{
        this.morning=false;
      }

      if(schedule[2] && schedule[3]){
        this.start2=this.convertMinutes(schedule[2]);
        this.end2=this.convertMinutes(schedule[3]);
        this.evening=true;
      }else{
        this.evening=false;
      }
      
    }else{
      this.selectedDay=null;
    }
  }

  convertMinutes(minutes:number){
    const hours=Math.floor(minutes/60);
    const mins=minutes%60;
    return {
      hour:hours,
      minute:mins,
      second:0
    }
  }

  toggle(day, event){
    console.log(event, day);
    if(event){
      this.availableDays.push(day);
    }else{
      this.availableDays.splice(this.availableDays.indexOf(day), 1)
    }
  }

  setSchedule(){
    console.log(this.start1);
  }

}
