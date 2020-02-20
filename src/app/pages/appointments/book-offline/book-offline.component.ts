import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../API.service';
import { Auth } from 'aws-amplify';
import { ToastrService } from '../../../services/toastr.service';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

@Component({
  selector: 'ngx-book-offline',
  templateUrl: './book-offline.component.html',
  styleUrls: ['./book-offline.component.scss']
})
export class BookOfflineComponent implements OnInit {
  @ViewChild('myForm', {static:false}) formValues;
  name:string;
  message:string;
  age:number;
  phone:string;
  loading:boolean;

  constructor(private apiService:APIService, private toastrService:ToastrService) { 
    this.loading=false;
  }

  ngOnInit() {
  }

  bookAppointment(){
    this.loading=true;
    const formattedPhone=`+91${this.phone}`;
    const phoneNumber=parsePhoneNumberFromString(formattedPhone, "IN");

    if(this.age<=122){

      if(this.phone){
        if(phoneNumber.isValid()){
          Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
            this.apiService.BookAppointment("OFFLINE", data.attributes.sub, this.name, this.message, this.age, this.phone).then((result)=>{
              this.toastrService.showToast("success", "Success", "Appointment successfully booked");
              this.formValues.resetForm();
              this.loading=false;
            }).catch(err=>{
              console.log(err)
              this.loading=false;
              this.toastrService.showToast("danger", "Error", err.message);
            })
          }).catch(err=>{
            this.loading=false;
            this.toastrService.showToast("danger", "Error", err.message);
          })
        }else{
          this.loading=false;
          this.toastrService.showToast("danger", "Error", "Please enter a valid 10-digit phone number");
        }
      }else{
        Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
          this.apiService.BookAppointment("OFFLINE", data.attributes.sub, this.name, this.message, this.age, this.phone).then((result)=>{
            this.toastrService.showToast("success", "Success", "Appointment successfully booked");
            this.formValues.resetForm();
            this.loading=false;
          }).catch(err=>{
            console.log(err)
            this.loading=false;
            this.toastrService.showToast("danger", "Error", err.message);
          })
        }).catch(err=>{
          this.loading=false;
          this.toastrService.showToast("danger", "Error", err.message);
        })
      }
    }else{
      this.loading=false;
      this.toastrService.showToast("danger", "Error", "Enter a valid age")
    }
  }

}
