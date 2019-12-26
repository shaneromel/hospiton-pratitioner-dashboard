import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage, Auth } from 'aws-amplify';
import { APIService } from '../../../API.service';
import { ToastrService } from '../../../services/toastr.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @ViewChild("submitVcDialog", {static:false}) submitVcDialog;
  
  submitVcDialogRef;

  image:string;
  imageFile;
  doctor:any;
  name:string;
  charge:number;
  speciality:string;
  isActive:boolean;
  email:string;
  phone:string;

  verificationCode:string;

  loading:boolean;
  locationLoader:boolean;

  lat:number;
  lng:number;

  settings={
    columns:{
      key:{
        filter:false
      },
      value:{
        filter:false,
        type:"html",
        valuePrepareFunction:(cell, row)=>{
          if(row.key === "Status"){
            return `<strong class="text-${cell === 'ACTIVE' ? 'success' : 'danger'}">${cell}</strong>`
          }else if(row.key === "Email verified"){
            return `<strong class="text-${cell === 'YES' ? 'success' : 'danger'}">${cell}</strong>`;
          }else{
            return cell;
          }
        }
      }
    },
    actions:{
      add:false,
      delete:false,
      edit:false
    },
    hideHeader:true,
    hideSubHeader:true
  };

  specialities:any;
  source:LocalDataSource=new LocalDataSource();

  council:string;
  regNumber:string;
  regYear:number;
  appointmentType:string;
  slotDuration:number;
  morningLimit:number;
  eveningLimit:number;

  constructor(private apiService:APIService, private toastrService:ToastrService, private dialogService:NbDialogService) { 
    this.image="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png";
    this.loading=false;
    this.locationLoader=false;
  }

  ngOnInit() {
    this.apiService.GetSpecialities().then(specialities=>{
      this.specialities=specialities;
    })

    Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
      this.apiService.GetDoctorById(data.attributes.sub).then(doctor=>{
        this.doctor=doctor;
        this.speciality=doctor.speciality;
        this.name=doctor.name;
        this.charge=doctor.charge;
        this.phone=doctor.phone_number;
        this.email=doctor.email;
        this.isActive=doctor.is_active;
        this.regNumber=doctor.reg_no;
        this.regYear=doctor.reg_year;
        this.council=doctor.reg_council;
        this.appointmentType=doctor.appointment_type;
        this.slotDuration=doctor.slot_duration;
        this.morningLimit=doctor.morning_limit;
        this.eveningLimit=doctor.evening_limit;
        if(doctor.image){
          Storage.get(doctor.image).then(url=>{
            this.image=url as string;
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
          });
        }

        if(doctor.location){
          this.lat=doctor.location[1];
          this.lng=doctor.location[0];
        }

        this.loadOtherDetails();

      })
    })
  }

  loadOtherDetails(){
    this.source.load([
      {
        key:"Average rating",
        value:this.doctor.rating
      },
      {
        key:"Rating count",
        value:this.doctor.rating_count
      },
      {
        key:"Profile visits",
        value:this.doctor.views
      },
      {
        key:"Status",
        value:this.doctor.is_active ? "ACTIVE" : "INACTIVE"
      },
      {
        key:"Email verified",
        value:this.doctor.email_verified ? "YES" : "NO"
      }
    ])
  }

  sendVerificationCode(){
    Auth.verifyCurrentUserAttribute("email").then(()=>{
      this.toastrService.showToast("success", "Success", "A verification code is sent to the registered email address");
      this.submitVcDialogRef=this.dialogService.open(this.submitVcDialog);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    });
  }
  
  submitVerificationCode(){
    Auth.verifyCurrentUserAttributeSubmit("email", this.verificationCode)
    .then(() => {
        this.toastrService.showToast("success", "Success", "Email successfully verfied");
        this.doctor.email_verified=true;
        this.loadOtherDetails();
        this.submitVcDialogRef.close();
    }).catch(e => {
        this.toastrService.showToast("danger", "Error", e.message);
    });
  }

  updateDoctor(){
    this.loading=true;
    // let data={
    //   _id:this.doctor._id,
    //   charge:this.doctor.charge,
    //   speciality:this.speciality,
    //   is_active:this.doctor.is_active,
    //   rating:this.doctor.rating,
    //   rating_count:this.doctor.rating_count,
    //   views:this.doctor.views,
    //   image:this.doctor.image
    // } as any;
    this.doctor.charge=this.doctor.charge;
    this.doctor.speciality=this.speciality;
    this.doctor.reg_council=this.council;
    this.doctor.reg_no=this.regNumber;
    this.doctor.reg_year=this.regYear;
    this.doctor.appointment_type=this.appointmentType;
    this.doctor.morning_limit=this.morningLimit;
    this.doctor.evening_limit=this.eveningLimit;
    if(this.appointmentType==="SLOT" && this.slotDuration){
      this.doctor.slot_duration=this.slotDuration;
    }else{
      this.toastrService.showToast("danger", "Error", "Slot duration has to be mentioned for appointment type slot");
      this.loading=false;
      return;
    }

    if(this.imageFile){
      Storage.put(this.doctor._id, this.imageFile,{
        contentType: 'image/png'
      }).then(result=>{

        this.doctor.image=(result as any).key;
        if(this.name!=this.doctor.name || this.phone!=this.doctor.phone_number || this.email!=this.doctor.email){
          Auth.currentAuthenticatedUser({bypassCache:true}).then(cognitoUser=>{
            Auth.updateUserAttributes(cognitoUser, {name:this.name, phone_number:this.phone, email:this.email}).then(()=>{
              this.apiService.UpdateDoctor(JSON.stringify(this.doctor)).then(()=>{
                this.loading=false;
                this.toastrService.showToast("success", "Success", "Details successfully updated")
              }).catch(err=>{
                this.loading=false;
                this.toastrService.showToast("danger", "Error", err.message);
              })
            }).catch(err=>{
              this.loading=false;
              this.toastrService.showToast("danger", "Error", err.message);
            })
          }).catch(err=>{
            this.loading=false;
            this.toastrService.showToast("danger", "Error", err.message);
          })
        }else{
          this.apiService.UpdateDoctor(JSON.stringify(this.doctor)).then(()=>{
            this.loading=false;
            this.toastrService.showToast("success", "Success", "Details successfully updated")
          }).catch(err=>{
            this.loading=false;
            this.toastrService.showToast("danger", "Error", err.message);
          })
        }

      })
    }else{  
      if(this.name!=this.doctor.name || this.phone!=this.doctor.phone_number || this.email!=this.doctor.email){
        Auth.currentAuthenticatedUser({bypassCache:true}).then(cognitoUser=>{
          Auth.updateUserAttributes(cognitoUser, {name:this.name, phone_number:this.phone, email:this.email}).then(()=>{
            this.apiService.UpdateDoctor(JSON.stringify(this.doctor)).then(()=>{
              this.toastrService.showToast("success", "Success", "Details successfully updated")
              this.loading=false;
            }).catch(err=>{
              this.toastrService.showToast("danger", "Error", err.message);
              this.loading=false;
            })
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
            this.loading=false;
          })
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
          this.loading=false;
        })
      }else{
        this.apiService.UpdateDoctor(JSON.stringify(this.doctor)).then(()=>{
          this.toastrService.showToast("success", "Success", "Details successfully updated");
          this.loading=false;
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
          this.loading=false;
        })
      }
    }
  }

  imageSelected(event){
    this.imageFile=event.target.files[0];
    var reader=new FileReader();
    reader.readAsDataURL(this.imageFile);

    reader.onload=ev=>{
      this.image=(ev.target as any).result;
    }
  }

  placeMarker(event){
    this.lat=event.coords.lat;
    this.lng=event.coords.lng;
  }

  setMarkedLocation(){
    this.locationLoader=true;
    Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
      if(this.doctor.location){
        this.apiService.RemoveDoctorLocation(data.username).then(()=>{
          this.apiService.SetDoctorLocation(data.username, this.lat, this.lng).then(()=>{
            this.toastrService.showToast("success", "Success", "Location successfully set");
            this.locationLoader=false;
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
            this.locationLoader=false;
          })
        })
      }else{
        this.apiService.SetDoctorLocation(data.username, this.lat, this.lng).then(()=>{
          this.toastrService.showToast("success", "Success", "Location successfully set");
          this.locationLoader=false;
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
          this.locationLoader=false;
        })
      }
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
      this.locationLoader=false;
    })
  }

  setCurrentLocation(){
    this.locationLoader=true;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        this.lat=position.coords.latitude;
        this.lng=position.coords.longitude;
        this.setMarkedLocation();
      })
    }else{
      this.locationLoader=false;
    }
  }

  removeLocation(){
    if(window.confirm("Are you sure you want to remove your location?")){
      this.locationLoader=true;
      Auth.currentAuthenticatedUser({bypassCache:true}).then(data=>{
        this.apiService.RemoveDoctorLocation(data.username).then(()=>{
          this.lat=null;
          this.lng=null;
          this.toastrService.showToast("success","Success", "Location successfully removed");
          this.locationLoader=false;
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
          this.locationLoader=false;
        })
      })
    }
  }

}
