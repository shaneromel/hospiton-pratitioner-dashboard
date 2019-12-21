import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { TrafficBarData, TrafficBar } from '../../../@core/data/traffic-bar';
import { takeWhile } from 'rxjs/operators';
import { APIService } from '../../../API.service';
import { Auth } from 'aws-amplify';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficBarData: TrafficBar;
  appointmentData: any[];
  revealed = false;
  period: string = 'week';
  type:string;
  loading:boolean;

  constructor(private trafficListService: TrafficListData,
              private trafficBarService: TrafficBarData,
              private apiService:APIService,
              private toastrService:ToastrService) {
    this.getAppointmentData(this.period);
    this.type="TOTAL";
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;
    this.loading=true;
    this.getAppointmentData(value);
  }

  getAppointmentData(period: string) {
    Auth.currentAuthenticatedUser({bypassCache:true}).then(user=>{
      switch(period){
        case "week":
          this.apiService.CountAppointments(user.username, this.type === "TOTAL" ? false : true).then(data=>{
            this.appointmentData=data as any;
            this.loading=false;
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
            this.loading=false;
          });
          break;
        case "month":
          this.apiService.CountAppointmentsByMonths(user.username, this.type === "TOTAL" ? false : true).then(data=>{
            this.appointmentData=data as any;
            this.loading=false;
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", JSON.stringify(err));
            this.loading=false;
          });
          break;
        case "year":
          this.apiService.CountAppointmentsByYear(user.username, this.type === "TOTAL" ? false : true).then(data=>{
            this.appointmentData=data as any;
            this.loading=false;
          }).catch(err=>{
            console.log(err)
            this.toastrService.showToast("danger", "Error", JSON.stringify(err));
            this.loading=false;
          })
      }
    })
  }

  typeChanged(event){
    this.loading=true;
    this.type=event;
    this.getAppointmentData(this.period)
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
