import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  old:string;
  new:string;
  confirmNew:string;

  constructor(private toastrService:ToastrService) { }

  ngOnInit() {
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
