import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ManageComponent } from './manage/manage.component';
import { NbCardModule, NbListModule, NbChatModule } from '@nebular/theme';

@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbCardModule,
    NbListModule,
    NbChatModule
  ]
})
export class ChatModule { }
