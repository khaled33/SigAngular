import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProprietairesService} from '../../../_service/proprietaires.service';
import {Proprietaires} from '../../../_model/proprietaires';
import {Observable} from 'rxjs';
import {ListComponent} from '../list/list.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit, OnChanges {
  id: number = 0;
  FormGroup: FormGroup;
  submitted = false;
  p: Proprietaires;

  @ViewChild('basicModal', {static: false}) openModal: ElementRef;


  constructor(private fb: FormBuilder, private ProprietairesService: ProprietairesService, private ListComponent: ListComponent) {
  }

  private _itemup: Proprietaires;

  get item(): Proprietaires {
    return this._itemup;
  }

  @Input()
  set item(val: Proprietaires) {
    this._itemup = val;
    try {
      this.id = val.id;
    } catch (e) {
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    try {
      this.FormGroup = this.fb.group({
        nom: [currentItem.currentValue.nom, Validators.required],
        prenom: [currentItem.currentValue.prenom, Validators.required],
        genre: [currentItem.currentValue.genre, Validators.required],
        dateDeNaissance: [currentItem.currentValue.dateDeNaissance, Validators.required],
        cin: [currentItem.currentValue.cin, Validators.required],
        regions: [currentItem.currentValue.regions, Validators.required],
        ville: [currentItem.currentValue.ville, Validators.required],
        codePostal: [currentItem.currentValue.codePostal, Validators.required],
      });
    } catch (e) {

    }
  }

  ngOnInit() {


    this.FormGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      genre: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      cin: ['', Validators.required],
      regions: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', Validators.required],
    });


  }

  get f() {
    return this.FormGroup.controls;
  }

  onClickSubmit() {


    if (this.FormGroup.invalid) {
      ;

      return;
    }

    this.p = this.FormGroup.value;
    console.log(this.p);
    this.ProprietairesService.Updateproprietaires(this.p, this.id).subscribe(value => {

        this.openModal.nativeElement.click();

        this.ListComponent.getProprietaires(this.ListComponent.pageevent, 9);
      }, error1 => {
      }
      , () => {

      }
    );


  }
}
