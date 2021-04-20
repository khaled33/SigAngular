import {Component, OnInit} from '@angular/core';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Proprietaires} from '../../../_model/proprietaires';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: number;
  pageSize: number;
  items: number;
  PageResponse: any;
  ProprietairesList:Array<Proprietaires>=[];
  constructor(private ProprietairesService: ProprietairesService) {
  }

  ngOnInit() {
    this.getProprietaires(0, 9);

  }

  getProprietaires(pageSize, pageNumber) {

    this.ProprietairesService.getPageProprietaires(pageSize, pageNumber).subscribe(data => {
      this.PageResponse = data;

        this.pageSize=this.PageResponse.pageable.pageSize;
      // this.page=this.PageResponse.pageable.pageNumber ;
      //
        this.items=this.PageResponse.totalElements;
//
// console.log(this.page);
// console.log(this.pageSize);
// console.log(this.items);

this.ProprietairesList=this.PageResponse.content;
console.log(this.ProprietairesList);
    });
  }


  pageChange($event) {
    this.getProprietaires($event, 9);


  }
}
