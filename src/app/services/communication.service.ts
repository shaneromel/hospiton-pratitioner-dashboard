import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  appointmentLoaderEvent:EventEmitter<any>=new EventEmitter();

  constructor() { }

}
