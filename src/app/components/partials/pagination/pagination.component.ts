import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() link:string=''
  @Input() params:any={}
  @Input() current:number =0;
  @Input() pages:number =0;
  
  page:number =1;
  pageFirst:number =0;
  pageLast:number =0;
  pagesArray:any=[];
  constructor() { }

  ngOnInit(): void {
    this.pagination();
  }
  async pagination(){
    await setTimeout(()=>{},500)
    this.pageFirst=(this.current>3?this.current-2:1)
    var i=this.pageFirst;
    this.pagesArray=[]
    for(;i<=(this.current+2)&& i <=this.pages;i++){
      this.pagesArray.push({
        page:i
      })
    }
  }

}
