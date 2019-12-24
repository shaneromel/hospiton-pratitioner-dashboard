import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { ManageComponent } from './manage/manage.component';
import { NbCardModule, NbButtonModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { ConfirmBtnComponent } from './components/confirm-btn/confirm-btn.component';
import { CancelBtnComponent } from './components/cancel-btn/cancel-btn.component';
import { FormsModule } from '@angular/forms';
import { CompleteBtnComponent } from './components/complete-btn/complete-btn.component';
import { BookOfflineComponent } from './book-offline/book-offline.component';
import { AdditionalDetailsComponent } from './components/additional-details/additional-details.component';
import { PatientNameComponent } from './components/patient-name/patient-name.component';
import { NbIconModule } from '@nebular/theme';
import { ManageSlotAppointmentsComponent } from './manage-slot-appointments/manage-slot-appointments.component';

@NgModule({
  declarations: [ManageComponent, ConfirmBtnComponent, CancelBtnComponent, CompleteBtnComponent, BookOfflineComponent, AdditionalDetailsComponent, PatientNameComponent, ManageSlotAppointmentsComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbIconModule,
    NbSpinnerModule
  ],
  entryComponents:[ConfirmBtnComponent, CancelBtnComponent, CompleteBtnComponent, AdditionalDetailsComponent, PatientNameComponent]
})
export class AppointmentsModule { }
