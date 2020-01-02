import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from 'aws-amplify';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { ToastrService } from '../../services/toastr.service';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { APIService } from '../../API.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild("otpDialog", {static:false}) otpDialog;
  @ViewChild("passwordInput", {static:false}) passwordInput:ElementRef;
  @ViewChild("confirmPasswordInput", {static:false}) confirmPasswordInput:ElementRef;
  
  otpDialogRef;
  
  email:string;
  name:string;
  charge:number;
  phone:string;
  password:string;
  confirmPassword:string;
  otp:string;
  speciality:string;
  user:any;

  specialities:any

  passwordShown:boolean;
  confirmPasswordShown:boolean;

  constructor(private toastrService:ToastrService, private dialogService:NbDialogService, private router:Router, private apiService:APIService) { 
    this.speciality="1";
    this.passwordShown=false;
    this.confirmPasswordShown=false;
  }

  ngOnInit() {
    this.apiService.GetSpecialities().then(specialities=>{
      this.specialities=specialities;
    })
  }

  registerDoctor(){
    const formattedPhone=`+91${this.phone}`;
    const phoneNumber=parsePhoneNumberFromString(formattedPhone, "IN");

    if(phoneNumber && this.charge && this.speciality!="1" && this.phone && this.name){
      if(phoneNumber.isValid()){

        if(this.password===this.confirmPassword){
          Auth.signUp({
            username:this.email,
            password:this.password,
            attributes:{
              email:this.email,
              phone_number:formattedPhone,
              name:this.name
            }
          }).then(data=>{
            this.user=data;
            this.otpDialogRef=this.dialogService.open(this.otpDialog);
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
          })
        }
      }else{
        this.toastrService.showToast("danger", "Error", "Please enter a valid phone number")
      }
    }else{
      this.toastrService.showToast("danger", "Error", "All fields are compulsory")
    }

  }

  toggleShowPassword(){
    this.passwordShown=!this.passwordShown;
    if(this.passwordShown){
      this.passwordInput.nativeElement.setAttribute('type', 'text');
    }else{
      this.passwordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  toggleShowConfirmPassword(){
    this.confirmPasswordShown=!this.confirmPasswordShown;

    if(this.confirmPasswordShown){
      this.confirmPasswordInput.nativeElement.setAttribute('type', 'text');
    }else{
      this.confirmPasswordInput.nativeElement.setAttribute('type', 'password');
    }

  }

  confirmSignUp(){
    Auth.confirmSignUp(this.email, this.otp).then(data=>{
      this.otpDialogRef.close();
      this.toastrService.showToast("success", "Sign up successful", "You will be redirected to the login page shortly");

      this.apiService.AddDoctor(this.user.userSub, this.speciality, this.charge).then(()=>{
        this.router.navigate(['/auth/login']);
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      })
      
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

}
