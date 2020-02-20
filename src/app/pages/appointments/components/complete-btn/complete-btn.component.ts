import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../../API.service';
import { ToastrService } from '../../../../services/toastr.service';
import { CommunicationService } from '../../../../services/communication.service';

@Component({
  selector: 'ngx-complete-btn',
  templateUrl: './complete-btn.component.html',
  styleUrls: ['./complete-btn.component.scss']
})
export class CompleteBtnComponent implements OnInit {
  rowData:any;

  constructor(private apiService:APIService, private toastrService:ToastrService, private communicationService:CommunicationService) { }

  ngOnInit() {
  }

  completeAppointment(){
    this.communicationService.appointmentLoaderEvent.emit(true);
    this.apiService.CompleteAppointment(this.rowData._id).then(()=>{
      this.toastrService.showToast("success", "Success", "Appointment successfully completed");
      this.communicationService.appointmentLoaderEvent.emit(false);
    }).catch(err=>{
      console.log(err);
      this.communicationService.appointmentLoaderEvent.emit(false);
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

}
