import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vergers} from '../../../_model/vergers';
import {VergersService} from '../../../_service/vergers.service';
import {Router} from '@angular/router';
import {Proprietaires} from '../../../_model/proprietaires';
import {ListComponent} from '../list/list.component';
import {ServiceGeoserverService} from '../../../_service/service-geoserver.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnChanges {

  private FormGroup: FormGroup;
  private submitted = false;
  private vergers: Vergers = new Vergers();
  private id: number = 0;

  constructor(private fb: FormBuilder, private ServiceGeoserverService: ServiceGeoserverService, private VergersService: VergersService, private Route: Router, private ListComponent: ListComponent) {
  }

  @ViewChild('basicModal', {static: false}) openModal: ElementRef;

  private _itemup: Vergers;

  get item(): Vergers {
    return this._itemup;
  }

  @Input()
  set item(val: Vergers) {
    this._itemup = val;
    try {
      this.id = val.id;
    } catch (e) {
    }

  }

  ngOnInit() {
    this.FormGroup = this.fb.group({
      superficies: ['', Validators.required],
      densites: ['', Validators.required],
      ageMoyen: ['', Validators.required],
      rendements: ['', Validators.required],
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

    this.vergers = this.FormGroup.value;
    this.vergers.geomString = 'POINT(' + this.FormGroup.value.x + ' ' + +this.FormGroup.value.y + ')';
    this.VergersService.UpdateVergers(this.vergers, this.id).subscribe(value => {
      this.openModal.nativeElement.click();
      this.ListComponent.getVergers(this.ListComponent.pageevent, 9);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    try {
      this.ServiceGeoserverService.getPointVergerById(this.id).subscribe(data => {
        // features: Array(1)
        // 0:
        // geometry:
        //   coordinates:
        try {
          var GeoJson: any = data;
          console.log(GeoJson.features[0].geometry.coordinates);
          var x = GeoJson.features[0].geometry.coordinates[0];
          var Y = GeoJson.features[0].geometry.coordinates[1];


          this.FormGroup = this.fb.group({
            superficies: [currentItem.currentValue.superficies, Validators.required],
            densites: [currentItem.currentValue.densites, Validators.required],
            ageMoyen: [currentItem.currentValue.ageMoyen, Validators.required],
            rendements: [currentItem.currentValue.rendements, Validators.required],
            x: [x, Validators.required],
            y: [Y, Validators.required],

          });

        } catch (e) {

        }
      });
    } catch (e) {

    }
  }
}
