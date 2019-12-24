import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { BookOfflineComponent } from './book-offline/book-offline.component';
import { ManageSlotAppointmentsComponent } from './manage-slot-appointments/manage-slot-appointments.component';

const routes: Routes = [
  {
    path:"manage", component:ManageComponent
  },
  {
    path:"", redirectTo:"manage", pathMatch:"full"
  },
  {
    path:"book-offline", component:BookOfflineComponent
  },
  {
    path:"manage-slot-appointments", component:ManageSlotAppointmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
