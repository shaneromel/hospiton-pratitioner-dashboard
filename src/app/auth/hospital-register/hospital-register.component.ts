import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Auth } from 'aws-amplify';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { ToastrService } from '../../services/toastr.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { APIService } from '../../API.service';

@Component({
  selector: 'ngx-hospital-register',
  templateUrl: './hospital-register.component.html',
  styleUrls: ['./hospital-register.component.scss']
})
export class HospitalRegisterComponent implements OnInit {
  @ViewChild("otpDialog", {static:false}) otpDialog;
  @ViewChild("passwordInput", {static:false}) passwordInput:ElementRef;
  @ViewChild("confirmPasswordInput", {static:false}) confirmPasswordInput:ElementRef;

  loading:boolean;
  otp:string;
  password:string;
  confirmPassword:string;
  name:string;
  address:string;
  email:string;
  phone:string;

  user;

  passwordShown:boolean;
  confirmPasswordShown:boolean;

  otpDialogRef:NbDialogRef<any>;

  constructor(private toastrService:ToastrService, private dialogService:NbDialogService, private apiService:APIService) { 
    this.loading=false;
  }

  ngOnInit() {
  }

  registerHospital(){
    const formattedPhone=`+91${this.phone}`;
    const phoneNumber=parsePhoneNumberFromString(formattedPhone, "IN");

    if(this.name && this.email && this.phone && this.address){
      if(phoneNumber.isValid()){
        if(this.password === this.confirmPassword){
          Auth.signUp({
            username:this.email,
            password:this.password,
            attributes:{
              email:this.email,
              phone_number:this.phone,
              name:this.name,
              "custom:type":"HOSPITAL"
            }
          }).then((data)=>{
            this.user=data;

            this.otpDialogRef=this.dialogService.open(this.otpDialog);
          })
        }else{
          this.toastrService.showToast("danger", "Error", "Passwords do not match")
        }
      }else{
        this.toastrService.showToast("danger", "Error", "Invalid phone number");
      }
    }else{
      this.toastrService.showToast("danger", "Error", "All fields are compulsory");
    }

  }

  confirmSignUp(){
    Auth.confirmSignUp(this.email, this.otp).then(()=>{
      this.apiService.AddHospital({
        _id:this.user.userSub,
        is_active:false,
        rating:0,
        rating_count:0
      }).then(()=>{
        this.toastrService.showToast("success", "Success", "Sign up successfully confirmed");
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      })
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  resendCode(){
    
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

}
