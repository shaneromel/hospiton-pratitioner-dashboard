import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private router:Router, private toastrService:ToastrService, private dialogService:NbDialogService) { }

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
