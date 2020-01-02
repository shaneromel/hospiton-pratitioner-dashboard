import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("oldPasswordInput", {static:false}) oldPasswordInput:ElementRef;
  @ViewChild("newPasswordInput", {static:false}) newPasswordInput:ElementRef;
  @ViewChild("confirmNewPasswordInput", {static:false}) confirmNewPasswordInput:ElementRef;

  old:string;
  new:string;
  confirmNew:string;

  oldPasswordShown:boolean;
  newPasswordShown:boolean;
  confirmNewPasswordShown:boolean;

  constructor(private toastrService:ToastrService) { 
    this.oldPasswordShown=false;
    this.newPasswordShown=false;
    this.confirmNewPasswordShown=false;
  }

  ngOnInit() {
  }

  toggleShowConfirmNewPassword(){
    this.confirmNewPasswordShown=!this.confirmNewPasswordShown;
    if(this.confirmNewPasswordShown){
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'text');
    }else{
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  toggleShowNewPassword(){
    this.newPasswordShown=!this.newPasswordShown;
    if(this.newPasswordShown){
      this.newPasswordInput.nativeElement.setAttribute('type', 'text');
    }else{
      this.newPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  toggleShowOldPassword(){
    this.oldPasswordShown=!this.oldPasswordShown;
    if(this.oldPasswordShown){
      this.oldPasswordInput.nativeElement.setAttribute('type', 'text');
    }else{
      this.oldPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  changePassword(){
    if(this.new===this.confirmNew){
      Auth.currentAuthenticatedUser({bypassCache:true}).then(user=>{
        Auth.changePassword(user, this.old, this.new).then(()=>{
          this.toastrService.showToast("success", "Success", "Password successfully changed");
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        })
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      })
    }else{
      this.toastrService.showToast("danger", "Error", "Confirm password does not match")
    }
  }

}
