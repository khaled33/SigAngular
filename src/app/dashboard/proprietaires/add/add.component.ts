import { Component, OnInit } from '@angular/core';
 import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Proprietaires} from '../../../_model/proprietaires';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Route, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

// @ts-ignore
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  FormGroup :FormGroup;
  submitted = false;
   p:Proprietaires;
  constructor(private fb: FormBuilder,private ProprietairesService:ProprietairesService,private Route:Router,
             ) { }

  ngOnInit() {

    this.FormGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['',Validators.required ],
      genre: ['', Validators.required],
      dateDeNaissance: ['',Validators.required ],
      cin: ['',Validators.required ],
      regions : ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', Validators.required],
  });

}
  // convenience getter for easy access to form fields
  get f() {
    return this.FormGroup.controls;
  }
  onClickSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FormGroup.invalid) {

      return;
    }
    this.p=this.FormGroup.value;
    console.log(this.p);
    this.ProprietairesService.addproprietaires(this.p).subscribe(value => {
      this.submitted = false;
      // this.Route.navigate(["dashboard/proprietaires/list"])
      this.FormGroup.reset();


    })


  }
}
