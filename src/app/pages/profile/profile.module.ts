import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewComponent } from './view/view.component';
import { NbCardModule, NbButtonModule, NbInputModule, NbSpinnerModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewComponent, ChangePasswordComponent, ScheduleComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    NbInputModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    NbSpinnerModule,
    NbSelectModule,
    NgbModule,
    NbCheckboxModule
  ]
})
export class ProfileModule { }
