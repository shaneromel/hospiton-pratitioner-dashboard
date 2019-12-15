import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../../API.service';
import { ToastrService } from '../../../../services/toastr.service';
import { CommunicationService } from '../../../../services/communication.service';

@Component({
  selector: 'ngx-cancel-btn',
  templateUrl: './cancel-btn.component.html',
  styleUrls: ['./cancel-btn.component.scss']
})
export class CancelBtnComponent implements OnInit {
  rowData:any;

  constructor(private apiService:APIService, private toastrService:ToastrService, private communicationService:CommunicationService) { }

  ngOnInit() {
  }

  cancelAppointment(){
    this.communicationService.appointmentLoaderEvent.emit(true);
    this.apiService.CancelAppointment(this.rowData._id).then(()=>{
      this.toastrService.showToast("success", "Success", "Appointment successfully cancelled");
      this.communicationService.appointmentLoaderEvent.emit(false);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
      this.communicationService.appointmentLoaderEvent.emit(false);
    })
  }

}
