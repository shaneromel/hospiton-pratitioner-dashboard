import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-patient-name',
  templateUrl: './patient-name.component.html',
  styleUrls: ['./patient-name.component.scss']
})
export class PatientNameComponent implements ViewCell, OnInit {
  rowData:any;
  @Input() value: string | number;

  constructor() { }

  ngOnInit() {
  }

}
