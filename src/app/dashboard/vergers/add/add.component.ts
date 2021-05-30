import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Router} from '@angular/router';
import {VergersService} from '../../../_service/vergers.service';
import {Vergers} from '../../../_model/vergers';
import {ToastrService} from 'ngx-toastr';
import {Proprietaires} from '../../../_model/proprietaires';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  FormGroup: FormGroup;
  submitted = false;
  vergers: Vergers = new Vergers();
  proprietaires: Proprietaires;
  hiddenDetaileproprietaires:boolean=true;
  hiddenImageRecherch:boolean=false;
  @ViewChild('pRef', {static: false}) pRef: ElementRef;
  cartCinInput: String;
  MessageEmpty: String;

  constructor(private fb: FormBuilder, private VergersService: VergersService,
              private proprietairesService: ProprietairesService,
              private Route: Router,private toastr: ToastrService) {
  }

  ngOnInit() {

    this.FormGroup = this.fb.group({
      superficies: ['', Validators.required],
      densites: ['', Validators.required],
      ageMoyen: ['', Validators.required],
      rendements: ['', Validators.required],
      annee: ['', Validators.required],
      x: ['', Validators.required],
      y: ['', Validators.required],

    });

  }

  get f() {
    return this.FormGroup.controls;
  }

  onClickSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FormGroup.invalid) {

      return;
    }

    if (this.proprietaires == null) {
      this.toastr.error('il faut  associer le verger à un propriétaire', 'Erreur', {positionClass: 'toast-bottom-right'});

      return;
    }

    this.vergers = this.FormGroup.value;
    this.vergers.geomString = 'POINT(' + this.FormGroup.value.x + ' ' + +this.FormGroup.value.y + ')';
    this.VergersService.addVergers(this.vergers).subscribe(value => {
       this.FormGroup.reset();
      this.submitted = false;
    });


  }



  recherchProprietairesParCin() {
    this.proprietairesService.getProprietairesByNumCartCin(this.cartCinInput).subscribe(value => {
      this.proprietaires = value;
      if (this.proprietaires!=null){
        this.hiddenDetaileproprietaires=false;
        this.hiddenImageRecherch=true;
        this.MessageEmpty=""
      } else {
        this.MessageEmpty="Il n'y a pas un propriétaire  avec ce numero du cin ="+this.cartCinInput;
        this.hiddenImageRecherch=false;
        this.hiddenDetaileproprietaires=true;

      }

    });
  }

  AssocierProprietaire() {
    if (this.proprietaires!=null){
      this.vergers.Propietaire= this.proprietaires;
      this.proprietaires=undefined;
      this.cartCinInput=null;
      this.hiddenImageRecherch=false;
      this.hiddenDetaileproprietaires=true;
      console.log(this.vergers);
    }

  }

  onKeydown() {
    this.recherchProprietairesParCin();
  }
}
