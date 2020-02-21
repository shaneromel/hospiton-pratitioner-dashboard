import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../../../API.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  chatUsers:any[];
  user:any;
  selectedUser:any;
  conversation:any[];
  constructor(private apiService:APIService, private toastrService:ToastrService) { }

  async ngOnInit() {
    this.user=await Auth.currentAuthenticatedUser();
    this.chatUsers =await this.apiService.GetChatUsers(this.user.username) as any;
    console.log(this.chatUsers);
    this.apiService.MessageReceivedSubListener(this.user.username).subscribe(message=>{
      const convo=(message as any).value.data.messageReceivedSub;

      if(this.selectedUser){
        if(convo.fromId===this.selectedUser._id){
          this.conversation.push(convo);
          return;
        }
      }

      this.chatUsers.forEach((u, i)=>{
        if(this.selectedUser){

          if(u._id!=this.selectedUser._id){
            if(!this.chatUsers[i].pending_count){
              this.chatUsers[i].pending_count=0;
            }
            this.chatUsers[i].pending_count++;
          }
        }else{
          if(!this.chatUsers[i].pending_count){
            this.chatUsers[i].pending_count=0;
          }
          this.chatUsers[i].pending_count++;
        }
      })

    })
  }

  selectUser(user){
    if(this.selectedUser){
      if(this.selectedUser._id === user._id){
        this.selectedUser=null;
      }else{
        this.selectedUser=user;
      }
    }else{
      this.selectedUser=user;
    }

    if(this.selectedUser){
      this.loadConversation().then(()=>{
        this.chatUsers.forEach((u, i)=>{
          if(u._id === this.selectedUser._id){
            this.chatUsers[i].pending_count=0;
          }
        })
        console.log("conversation loaded");
      }).catch(err=>{
        console.log(err);
      })
    }

  }

  async loadConversation(){
    this.conversation=await this.apiService.GetConversation(this.user.username, this.selectedUser._id) as any;
    console.log(this.conversation);
  }

  sendMessage(event){
    console.log(event);
    this.apiService.SendMessage(this.user.username, event.message, this.selectedUser._id).then(convo=>{
      this.conversation.push(convo);
    }).catch(err=>{
      this.toastrService.showToast("danger", "Error", err.message);
    })
  }

}
