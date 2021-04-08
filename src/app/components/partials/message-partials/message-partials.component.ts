import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService,Message } from 'src/app/services/chat.service';
import { RestService } from 'src/app/services/rest.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-message-partials',
  templateUrl: './message-partials.component.html',
  styleUrls: ['./message-partials.component.scss']
})
export class MessagePartialsComponent implements OnInit {
  @ViewChild('scrollChat') private myScrollContainer: ElementRef;
  id_user: any='';
  txtmessage: any=''
  isLoggedIn = false;
  user: any={};
  messages: any=[];
  id_room: any='';
  type_room: any='';
  data_chat:any={}
  query:any='';
  chatactive:boolean=false;
  constructor(private chatService:ChatService,private tokenInterceptorService: TokenInterceptorService,private route: ActivatedRoute,private restService: RestService,) {
    chatService.messages.subscribe(
      (response:any)=>{
        console.log(response)
        if(response.type=="message"){
          if(response.id_room===this.id_room){
            this.messages.push(response)
          }
        }
        else if(response.type=="message_all"){
          this.messages=response.messages
          this.scrollToBottom();
        }
      }
    )
  }
 
  ngOnInit(): void {
    this.searchType();
    this.verLogeo()
  }
  async searchType(){
    this.query = this.route.snapshot.paramMap.get('pais')||'/peru';
    this.route.queryParamMap.subscribe((params:any)=>{
      this.type_room=params.params.type
    })
    await this.restService.getSelectPais(this.query).subscribe(data =>{
      this.id_room=data.uid
      this.data_chat=data
      this.joinMessage()
    });
    
  }
  joinMessage(){
    var message={type:"join",nickname:this.user.name,avatar:'',message:'',token:this.user.token,room:{type_room:this.type_room,id_room:this.id_room}};
    this.chatService.messages.next(message)
  }
  sendMessage(){
    var message={type:"message",nickname:this.user.name,avatar:'',message:this.txtmessage,token:this.user.token,room:{type_room:this.type_room,id_room:this.id_room}};
    this.chatService.messages.next(message)

    var msg={
      id_usuario:this.user.uid,
      message:this.txtmessage,
      avatar:'',
    }
    this.messages.push(msg)
    this.txtmessage='';

    this.scrollToBottom();

  }
  verLogeo() {

    const user = this.tokenInterceptorService.getUser();
    this.user=user
    this.id_user=user.uid;
    if (user.ok) {
      this.isLoggedIn = true;
    } else {

    }
  }
  openChat(){
    this.chatactive=true
  }
  async scrollToBottom(){
      try {
        setTimeout(()=>{
          console.log(this.myScrollContainer.nativeElement.scrollHeight)
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        },1000)
        
      } catch(err) { }                 
  }
}
