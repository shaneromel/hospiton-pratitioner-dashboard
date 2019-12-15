import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path:"view", component:ViewComponent
  },
  {
    path:"", redirectTo:"view", pathMatch:"full"
  },
  {
    path:"change-password", component:ChangePasswordComponent
  },
  {
    path:"schedule", component:ScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
