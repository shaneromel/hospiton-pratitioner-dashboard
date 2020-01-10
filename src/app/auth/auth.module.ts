import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NbMenuModule, NbLayoutModule, NbCardModule, NbInputModule, NbButtonModule, NbDialogModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { HospitalRegisterComponent } from './hospital-register/hospital-register.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent, HospitalRegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    NbDialogModule,
    NbSelectModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule
  ]
})
export class AuthModule { }
