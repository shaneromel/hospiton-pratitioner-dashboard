import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { BookOfflineComponent } from './book-offline/book-offline.component';

const routes: Routes = [
  {
    path:"manage", component:ManageComponent
  },
  {
    path:"", redirectTo:"manage", pathMatch:"full"
  },
  {
    path:"book-offline", component:BookOfflineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
