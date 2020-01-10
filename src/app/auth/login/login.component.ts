import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

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
  @ViewChild("userConfirmationDialog", {static:false}) userConfirmationDialog;

  username:string;
  password:string;
  user;
  otp:string;
  code:string;
  new:string;
  confirmNew:string;
  confirmationCode:string;

  fpUsername:string;

  otpDialogRef:NbDialogRef<any>;
  fpUsernameDialogRef:NbDialogRef<any>;
  fpCodeDialogRef:NbDialogRef<any>;
  userConfirmationDialogRef:NbDialogRef<any>;

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
      console.log(this.user)
      this.otpDialogRef=this.dialogService.open(this.otpDialog);
    }).catch(err=>{
      console.log(err);
      
      if(err.code==="UserNotConfirmedException"){
        Auth.resendSignUp(this.username).then(()=>{
          this.userConfirmationDialogRef=this.dialogService.open(this.userConfirmationDialog);
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        })
      }

      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  confirmUser(){
    Auth.confirmSignUp(this.username, this.confirmationCode).then(()=>{
      this.toastrService.showToast("success", "Confirmation successful", "Now you can login to your account.");
      this.userConfirmationDialogRef.close();
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

  resendCode(){
    Auth.resendSignUp(this.username).then(()=>{
      this.toastrService.showToast("success", "Success", "Code resent successfully");
      this.userConfirmationDialogRef.close();
      this.userConfirmationDialogRef=this.dialogService.open(this.userConfirmationDialog);
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
