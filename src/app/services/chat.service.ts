import { Injectable } from '@angular/core';
import {observable,Subject} from 'rxjs'
import {environment} from '../../environments/environment'
import { WebsocketService } from './websocket.service';
import {map, catchError} from "rxjs/operators";

export interface Message{
  nickname:string,
  avatar:string,
  message:string,
  token:string,
  room:{},
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages:Subject<Message>;
  constructor(private wsService:WebsocketService) { 
    this.messages=<Subject<Message>>wsService
    .connect(environment.CHAT_URL)
    .pipe(
      map((response:MessageEvent)=>{
        let data=JSON.parse(response.data);
        return data;
      })
    )
    
  }
}
