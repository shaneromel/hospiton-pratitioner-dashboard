import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent implements OnInit {
  @ViewChild("detailsDialog", {static:false}) detailsDialog;
  detailsDialogRef;
  rowData:any;

  settings={
    columns:{
      key:{
        type:"string",
        filter:false
      },
      value:{
        type:"string",
        filter:false
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
  
  source:LocalDataSource=new LocalDataSource();

  constructor(private dialogService:NbDialogService) { }

  ngOnInit() {
  }

  openDialog(){
    const prefferedDate=new Date(this.rowData.preffered_timestamp)
    const data=[
      {
        key:"Age",
        value:this.rowData.age
      },
      {
        key:"Preferred time",
        value:this.rowData.preffered_timestamp ? `${prefferedDate.getHours()}:${prefferedDate.getMinutes()}:${prefferedDate.getSeconds()}` : "NA"
      },
      {
        key:"Message",
        value:this.rowData.message ? this.rowData.message : "NA"
      }
    ];

    this.source.load(data);

    this.detailsDialogRef=this.dialogService.open(this.detailsDialog);
  }

}
