import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MacolistaListPublic } from 'src/app/models/mancolista.interface';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mancolista',
  templateUrl: './mancolista.component.html',
  styleUrls: ['./mancolista.component.scss']
})
export class MancolistaComponent implements OnInit {
  dataMancoLista: any=[];
  api = environment.conect_url;
  constructor(private restService: RestService,private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.getMancoLista()
  }
  async getMancoLista() {
      this.restService.getMyAllMancolista().subscribe((resp:any)=>{
        console.log(resp.msg.id_estampilla)
        this.dataMancoLista.push(resp.msg.id_estampilla)
      });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
