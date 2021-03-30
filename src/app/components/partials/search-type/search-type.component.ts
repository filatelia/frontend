import { OnChanges, SimpleChanges, DoCheck, Component, EventEmitter,ChangeDetectorRef, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.scss']
})
export class SearchTypeComponent implements  OnChanges, DoCheck, OnInit {
  @Input() tipo: any;
  search: any='';
  searchTemp: any='';
  @Output() select=new EventEmitter();
  data: any=[]
  dataSearch: any=[]
  isopen: boolean=false;
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
    if(this.tipo.value==''){
      this.search='';
      console.log("primer")
    }
    else if(this.searchTemp==this.tipo.value) {
      console.log("segundo")
      this.refresh();
      this.data=[]
      return;
    }
    else{
      this.search=this.tipo.value;
      console.log("tercero")
    }
    this.filter();
    this.refresh();
  }
  filter(){
    var data=this.dataSearch.filter((el:any)=>el.name.toLowerCase().includes(this.search.toLowerCase()))
    this.data=data
  }
  ngOnInit(): void {
      this.listSearch();
  }
   listSearch(){
    this.restService.getAllTemas(1).subscribe((resp:any)=>{
      this.dataSearch=resp.temas
    });
  }
  selected(data:any){
    this.searchTemp=data.name
    this.select.emit(data)
    this.data=[]
    
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
