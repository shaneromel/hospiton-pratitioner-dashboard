import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../../../API.service';
import { ToastrService } from '../../../../services/toastr.service';
import { CommunicationService } from '../../../../services/communication.service';

@Component({
  selector: 'ngx-confirm-btn',
  templateUrl: './confirm-btn.component.html',
  styleUrls: ['./confirm-btn.component.scss']
})
export class ConfirmBtnComponent implements OnInit {
  rowData:any;

  constructor(private apiService:APIService, private toastrService:ToastrService, private communicationService:CommunicationService) { }

  ngOnInit() {
  }

  confirmAppointment(){
    this.communicationService.appointmentLoaderEvent.emit(true);
    this.apiService.ConfirmAppointment(this.rowData._id).then(()=>{
      this.toastrService.showToast("success", "Success", "Appointments successfully confirmed");
      this.communicationService.appointmentLoaderEvent.emit(false);
    }).catch(err=>{
      this.communicationService.appointmentLoaderEvent.emit(false);
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

}
