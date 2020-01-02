import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("otpDialog", {static:false}) otpDialog;
  @ViewChild("fpUsernameDialog", {static:false}) fpUsernameDialog; 
  @ViewChild("fpCodeDialog", {static:false}) fpCodeDialog;
  @ViewChild("passwordInput", {static:false}) passwordInput:ElementRef;
  @ViewChild("newPasswordInput", {static:false}) newPasswordInput:ElementRef;
  @ViewChild("confirmNewPasswordInput", {static:false}) confirmNewPasswordInput:ElementRef;

  username:string;
  password:string;
  user;
  otp:string;
  code:string;
  new:string;
  confirmNew:string;
  
  fpUsername:string;

  otpDialogRef;
  fpUsernameDialogRef;
  fpCodeDialogRef;

  passwordShown:boolean;
  newPasswordShown:boolean;
  confirmNewPasswordShown:boolean;

  constructor(private router:Router, private toastrService:ToastrService, private dialogService:NbDialogService) { 
    this.passwordShown=false;
    this.newPasswordShown=false;
    this.confirmNewPasswordShown=false;
  }

  ngOnInit() {
  }

  login(){
    Auth.signIn({
      username:this.username,
      password:this.password
    }).then((user)=>{
      this.user=user;
      this.otpDialogRef=this.dialogService.open(this.otpDialog);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  toggleShowNewPassword(){
    if(this.newPasswordShown){
      this.newPasswordInput.nativeElement.setAttribute('type', 'password');
    }else{
      this.newPasswordInput.nativeElement.setAttribute('type', 'text');
    }
    this.newPasswordShown=!this.newPasswordShown;
  }

  toggleShowConfirmNewPassword(){
    if(this.confirmNewPasswordShown){
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'password');
    }else{
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'text');
    }
    this.confirmNewPasswordShown=!this.confirmNewPasswordShown;
  }

  toggleShowPassword(){
    if(this.passwordShown){
      this.passwordInput.nativeElement.setAttribute('type', 'password');
    }else{
      this.passwordInput.nativeElement.setAttribute('type', 'text');
    }
    this.passwordShown=!this.passwordShown;
  }

  forgotPassword(){
    this.fpUsernameDialogRef=this.dialogService.open(this.fpUsernameDialog);
  }

  enterOtp(){
    Auth.confirmSignIn(this.user, this.otp, "SMS_MFA").then(data=>{
      this.otpDialogRef.close();
      this.router.navigate(['/pages']);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  submitCode(){
    if(this.new===this.confirmNew){
      Auth.forgotPasswordSubmit(this.fpUsername, this.code, this.new).then(data=>{
        this.fpCodeDialogRef.close()
        this.toastrService.showToast("success", "Success", "Password successfully changed");
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      })
    }else{
      this.toastrService.showToast("danger", "Error", "Please re-enter the password correctly");
    }
  }
  
  submitFpUsername(){
    Auth.forgotPassword(this.fpUsername).then(data=>{
      this.fpUsernameDialogRef.close();
      this.toastrService.showToast("success", "Success", "Password reset email successfully sent");
      this.fpCodeDialogRef=this.dialogService.open(this.fpCodeDialog);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

}
