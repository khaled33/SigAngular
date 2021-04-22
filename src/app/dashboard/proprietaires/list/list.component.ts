import {Component, EventEmitter, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Proprietaires} from '../../../_model/proprietaires';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: number=1;
  pageevent: number;
  pageSize: number;
  items: number;
  PageResponse: any;
  ProprietairesList: Array<Proprietaires> = [];
  proprietaireUpdate: Proprietaires;

  constructor(private ProprietairesService: ProprietairesService) {
  }

  ngOnInit() {
    this.getProprietaires(0, 9);

  }

  getProprietaires(pageSize, pageNumber) {

    this.ProprietairesService.getPageProprietaires(pageSize, pageNumber).subscribe(data => {
      this.PageResponse = data;

      this.pageSize = this.PageResponse.pageable.pageSize;
         this.pageevent=this.PageResponse.pageable.pageNumber ;
      //
      this.items = this.PageResponse.totalElements;

      this.ProprietairesList = this.PageResponse.content;
      console.log(this.ProprietairesList);
    });
  }


  pageChange($event) {
    this.getProprietaires($event, 9);


  }

  confirmBox(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer?',
      text: '',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimé!',
          'le propriétaire a été supprimé.',
          'success'
        );
        this.ProprietairesService.DeleteProprietaires(id).subscribe(value => {

        }, error1 => {
        }, () => {
          this.getProprietaires(this.pageevent,9);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'le propriétaire n\'est pas supprimé :)',
          'error'
        );
      }
    });
  }

  update(Proprietaire: Proprietaires) {
    this.proprietaireUpdate = Proprietaire;
  }


}
