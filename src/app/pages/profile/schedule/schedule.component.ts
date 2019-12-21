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
        if(!this.doctor.schedule){
          this.doctor.schedule={}
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
      if(this.doctor.schedule[day]){
        const schedule=this.doctor.schedule[day];

        if(schedule.morning){
          this.start1=this.convertMinutes(schedule.morning[0]);
          this.end1=this.convertMinutes(schedule.morning[1]);
          this.morning=true;
        }else{
          this.morning=false;
        }
  
        if(schedule.evening){
          this.start2=this.convertMinutes(schedule.evening[0]);
          this.end2=this.convertMinutes(schedule.evening[1]);
          this.evening=true;
        }else{
          this.evening=false;
        }
      }else{
        this.start1=null;
        this.start2=null;
        this.end1=null;
        this.end2=null;
        this.morning=false;
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

  convertToMinutes(time){
    return time.hour*60+time.minute;
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

    if(this.morning && this.evening){
      this.doctor.schedule[this.selectedDay]={
        morning:this.start1 && this.end1 ? [this.convertToMinutes(this.start1), this.convertToMinutes(this.end1)] : null,
        evening:this.start2 && this.end2 ? [this.convertToMinutes(this.start2), this.convertToMinutes(this.end2)] : null
      };
    }else if(this.morning){
      this.doctor.schedule[this.selectedDay]={morning:[this.convertToMinutes(this.start1), this.convertToMinutes(this.end1)]};
    }else if(this.evening){
      this.doctor.schedule[this.selectedDay]={evening:[this.convertToMinutes(this.start2), this.convertToMinutes(this.end2)]};
    }else{
      this.doctor.schedule[this.selectedDay]=null;
    }
    
    this.apiService.UpdateDoctor(JSON.stringify(this.doctor)).then(()=>{
      this.toastrService.showToast("success", "Success", "Schedule successfully updated");
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })

  }



}
