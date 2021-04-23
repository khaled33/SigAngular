import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Router} from '@angular/router';
import {VergersService} from '../../../_service/vergers.service';
import {Vergers} from '../../../_model/vergers';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
   FormGroup :FormGroup;
   submitted = false;
   vergers:Vergers=new Vergers();
  constructor(private fb: FormBuilder,private VergersService:VergersService,private Route:Router) { }

  ngOnInit() {
    this.FormGroup = this.fb.group({
      superficies: ['', Validators.required],
      densites: ['',Validators.required ],
      ageMoyen: ['', Validators.required],
      rendements: ['',Validators.required ],
      x: ['',Validators.required ],
      y: ['',Validators.required ],

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

    this.vergers=   this.FormGroup.value;
    this.vergers.geomString="POINT("+this.FormGroup.value.x+" "+ +this.FormGroup.value.y+")";
    this.VergersService.addVergers(this.vergers).subscribe(value => {
      console.log(this.vergers);
    })



  }
}
