import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-back-card',
  styleUrls: ['./traffic-back-card.component.scss'],
  templateUrl: './traffic-back-card.component.html',
})
export class TrafficBackCardComponent implements OnDestroy {

  private alive = true;

  @Input() appointmentData: any;

  currentTheme: string;
  labels:string[];
  data:number[];
  formatter:string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnChanges(){
    if(this.appointmentData){
      this.data=this.appointmentData.map(a=>a.booking_count + a.complete_count);
      this.labels=this.appointmentData.map(a=>a.day);

      console.log(this.appointmentData);
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
