import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: Rx.Subject<MessageEvent>;
  constructor() { }
   public connect(url:any): Rx.Subject<MessageEvent>{
     if(!this.subject){
      this.subject=this.create(url);
      console.log("success connect" + url)
     }
     return this.subject;
   }
   private create(url:any):Rx.Subject<MessageEvent>{
      let ws=new WebSocket(url);
      ws.onopen=((resp)=>{
        var data = sessionStorage.getItem('auth-token');
        var dataSend={type:'connect',token:data};
        ws.send(JSON.stringify(dataSend))
      })
      let observable=Rx.Observable.create(
        (obs:Rx.Observer<MessageEvent>)=>{
          ws.onmessage=obs.next.bind(obs);
          ws.onerror=obs.error.bind(obs)
          ws.onclose=obs.complete.bind(obs)
          return ws.close.bind(ws);
        }
      )

      let observer={
        next:(data:any)=>{
          if(ws.readyState===WebSocket.OPEN){
            ws.send(JSON.stringify(data));
          }
        }
      }
      return Rx.Subject.create(observer,observable );
   }
}
