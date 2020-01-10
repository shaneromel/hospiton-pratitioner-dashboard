import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { HospitalRegisterComponent } from './hospital-register/hospital-register.component';

const routes: Routes = [
  {
    path:"", component:AuthComponent,
    children:[
      {
        path:"login", component:LoginComponent
      },
      {
        path:"", redirectTo:"login", pathMatch:"full"
      },
      {
        path:"register", component:RegisterComponent
      },
      {
        path:"register-hospital", component:HospitalRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
