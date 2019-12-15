import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { LocalDataSource, Cell } from 'ng2-smart-table';
import { ConfirmBtnComponent } from '../components/confirm-btn/confirm-btn.component';
import { CancelBtnComponent } from '../components/cancel-btn/cancel-btn.component';
import { ToastrService } from '../../../services/toastr.service';
import { CompleteBtnComponent } from '../components/complete-btn/complete-btn.component';
import { Auth } from 'aws-amplify';
import { AdditionalDetailsComponent } from '../components/additional-details/additional-details.component';
import { PatientNameComponent } from '../components/patient-name/patient-name.component';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'ngx-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      user_name: {
        title: 'Patient name',
        type: 'custom',
        renderComponent:PatientNameComponent,
        width:"300px"
      },
      // age:{
      //   title:"Age",
      //   type:"html",
      //   valuePrepareFunction:(cell, row)=>{
      //     return cell ? cell : "NA";
      //   }
      // },
      phone:{
        title:"Phone number",
        type:"html",
        valuePrepareFunction:(cell, row)=>{
          return cell ? cell : "NA";
        },
        width:"200px"
      },
      // type: {
      //   title: 'Speciality',
      //   type: 'string',
      // },
      booking_timestamp:{
        title:"Booking time",
        type:"html",
        valuePrepareFunction:(cell, row)=>{
          const date=new Date(cell);
          return cell ? `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` : "NA";
        },
        sort:true,
        sortDirection:'desc',
        filter:false
      },
      // preferred_timestamp: {
      //   title: 'Preferred time',
      //   type: 'html',
      //   valuePrepareFunction:(cell, row)=>{
      //     const date=new Date(cell);
      //     return cell ? `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` : "NA";
      //   },
      //   filter:false
      // },
      // message: {
      //   title: 'Message',
      //   type: 'string',
      // },
      // appointment_type: {
      //   title: 'Type',
      //   type: 'html',
      //   filter:{
      //     type:"list",
      //     config:{
      //       selectText:"All",
      //       list:[
      //         {value:"ONLINE", title:"Online"},
      //         {value:"OFFLINE", title:"Offline"}
      //       ]
      //     }
      //   },
      //   valuePrepareFunction:(cell, row)=>{
      //     let html;

      //     switch(cell){
      //       case "ONLINE":
      //         html=`<strong class="text-success">${cell}</strong>`;
      //         break;
      //       case "OFFLINE":
      //         html=`<strong class="text-danger">${cell}</strong>`;
      //         break;
      //       default:
      //         html=`<strong class="text-secondary">Invalid type</strong>`;
      //     }

      //     return html;

      //   }
      // },
      appointment_status: {
        title: 'Status',
        type: 'html',
        filter:{
          type:"list",
          config:{
            selectText:"All",
            list:[
              {value:"PENDING", title:"Pending"},
              {value:"CONFIRMED", title:"Confirmed"},
              {value:"COMPLETE", title:"Complete"},
              {value:"CANCELLED", title:"Cancelled"}
            ]
          }
        },
        valuePrepareFunction:(cell, row)=>{
          let html;

          switch(cell){
            case "PENDING":
              html=`<strong class="text-warning">${cell}</strong>`;
              break;
            case "CONFIRMED":
              html=`<strong class="text-success">${cell}</strong>`;
              break;
            case "COMPLETE":
              html=`<strong class="text-primary">${cell}</strong>`;
              break;
            case "CANCELLED":
              html=`<strong class="text-danger">${cell}</strong>`;
              break;
            default:
              html=`<strong class="text-secondary">Invalid status</strong>`;
          }
          
          return html;
        }
      },
      confirm_btn:{
        title:"Confirm",
        type:"custom",
        renderComponent:ConfirmBtnComponent,
        filter:false
      },
      cancel_btn:{
        title:"Cancel",
        type:"custom",
        renderComponent:CancelBtnComponent,
        filter:false
      },
      complete_btn:{
        title:"Complete",
        type:"custom",
        renderComponent:CompleteBtnComponent,
        filter:false
      },
      additional_details:{
        title:"Additional details",
        type:"custom",
        renderComponent:AdditionalDetailsComponent,
        filter:false
      }
    },
    actions:{
      add:false,
      edit:false,
      delete:false
    }
  };

  source: LocalDataSource = new LocalDataSource();
  start:number;
  end:number;
  loading:boolean;

  user:any;

  tfilter:string;

  constructor(private apiService:APIService, private toastrService:ToastrService, private communicationService:CommunicationService) { 
    this.start=(new Date()).setHours(0, 0, 0, 0);
    this.end=(new Date()).setHours(24, 60);
    this.tfilter="1";
    this.loading=false;
  }

  ngOnInit() {

    this.communicationService.appointmentLoaderEvent.subscribe(value=>{
      this.loading=value;
    })

    Auth.currentAuthenticatedUser({bypassCache:true}).then(user=>{
      this.user=user;

      this.apiService.GetAppointmentsByDoctor(user.username, this.start, this.end).then(data=>{
        this.source.load(data as any);
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      });

      this.apiService.AppointmentsChangedSubListener(user.username).subscribe(data=>{
        const appointment=(data as any).value.data.appointmentsChangedSub;
        this.source.getAll().then(data=>{
          if(data.filter(a=>a._id===appointment._id).length>0){
            this.source.update(data.filter(a=>a._id===appointment._id)[0], appointment).then(()=>{
            }).catch(err=>{
              this.toastrService.showToast("danger", "Error", err.message);
            })
          }else{
            this.source.prepend(appointment);
          }
        })
      })

    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })

  }

  timeFilter(event){
    switch(event){
      case "1":
        this.apiService.GetAppointmentsByDoctor(this.user.username, this.start, this.end).then(data=>{
          this.source.load(data as any);
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        });
        break;
      case "2":
        this.apiService.GetAppointmentsByDoctor(this.user.username).then(data=>{
          this.source.load(data as any);
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        });
        break;
      default:
        this.toastrService.showToast("danger", "Error","Wrong selection");
    }
  }

}
