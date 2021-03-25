import { OnChanges, SimpleChanges, DoCheck, Component, EventEmitter,ChangeDetectorRef, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-paises',
  templateUrl: './search-paises.component.html',
  styleUrls: ['./search-paises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPaisesComponent implements OnChanges, DoCheck, OnInit {
  @Input() pais: any;
  search: any;
  @Output() select=new EventEmitter();
  dataPaises: any=[]
  dataPaisesSearch: any=[]
  api= environment.conect_url
  constructor(
    private sanitizer:DomSanitizer,
    private restService:RestService,
    private cd: ChangeDetectorRef
  ) {}

  refresh() {
    this.cd.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  ngDoCheck() {
    this.checkedValue();
  }

  checkedValue(){
    if(!this.pais.value) return;
    if(this.search==this.pais.value||this.pais.value.trim()=='')return;
    this.search=this.pais.value;
    this.filter();
    this.refresh();
  }
  filter(){
    var data=this.dataPaisesSearch.filter((el:any)=>el.name.toLowerCase().includes(this.search.toLowerCase()))
    this.dataPaises=data
    console.log(this.dataPaises.length)
  }
  ngOnInit(): void {
      this.listSearch();
  }
   listSearch(){
    this.restService.getAllPaises(1).subscribe((resp:any)=>{
      var data=resp;
      this.dataPaisesSearch=data.msg
    });
  }
  selected(data:any){
    this.select.emit(data)
    this.dataPaises=[]
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
