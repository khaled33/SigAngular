import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductionsAnnuelService} from '../../_service/ProductionsAnnuel.service';
import {AnneeProduction} from '../../_model/productions-annuel';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {pieChart} from '../../_model/pieChart';
import {PieChartService} from '../../_service/PieChart.service';

@Component({
  selector: 'app-production-annuel',
  templateUrl: './production-annuel.component.html',
  styleUrls: ['./production-annuel.component.css']
})
export class ProductionAnnuelComponent implements OnInit, AfterViewInit {
  ModaleProduction: AnneeProduction;
  ModaleProductionUpdate: AnneeProduction;
  ModaleProductionList: AnneeProduction[];
  FormGroup: FormGroup;
  FormGroupUpdate: FormGroup;
  submitted = false;
  submittedUpdate = false;
  ListAnne: Array<number> = [];
  @ViewChild('basicModal', {static: false}) openModal: ElementRef;
  @ViewChild('basicModal2', {static: false}) openModalUpdate: ElementRef;
  view: any[] = [500, 500];
  view1: any[] = [1000  , 260];
  modalpieChart: any[];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Sales';
  timeline = true;
  data: any = [

    {
      'name': 'Germany',
      'series': []
    }


  ];
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#fa1d24', '#FF7F50', '#90EE90', '#9370DB']
  };

  //pie
  showLabels = true;

  constructor(private fb: FormBuilder,
              private ProductionsAnnuelService: ProductionsAnnuelService,
              private PieChartService: PieChartService) {
  }

  ngOnInit() {
    for (let i = 2000; i < 2099; i++) {
      this.ListAnne.push(i);
    }
    this.FormGroup = this.fb.group({
      anneeProduction: ['', Validators.required],
      productionValue: ['', Validators.required],

    });

    this.FormGroupUpdate = this.fb.group({
      id: ['', Validators.required],
      anneeProduction: ['', Validators.required],
      productionValue: ['', Validators.required],

    });
    this.getAllProductionsAnnuel();
    this.getPieChart();

  }

  getAllProductionsAnnuel() {
    this.ProductionsAnnuelService.getPageProductionsAnnuel().subscribe(value => {
      this.ModaleProductionList = value;
      this.getPieChart();

    });
  }

  updateProduction(Production: AnneeProduction) {

    this.FormGroupUpdate.get('id').setValue(Production.id);
    this.FormGroupUpdate.get('anneeProduction').setValue(Production.anneeProduction);
    this.FormGroupUpdate.get('productionValue').setValue(Production.productionValue);
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
          'La Production Annuel a été supprimé.',
          'success'
        );
        this.ProductionsAnnuelService.DeleteProductionsAnnuel(id).subscribe(value => {

        }, error1 => {
        }, () => {
          this.getAllProductionsAnnuel();
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La Production Annuel n\'est pas supprimé :)',
          'error'
        );
      }
    });
  }


  onClickSubmit() {
    this.submitted = true;
    // stop here if form is invalid

    if (this.FormGroup.invalid) {

      return;
    }

    this.openModal.nativeElement.click();

    this.ModaleProduction = this.FormGroup.value;
    this.ProductionsAnnuelService.addProductionsAnnuel(this.ModaleProduction).subscribe(value => {
      this.FormGroup.reset();
      this.getAllProductionsAnnuel();
      this.submitted = false;

    });


  }

  get f() {
    return this.FormGroup.controls;
  }

  update() {
    this.submittedUpdate = true;

    // if (this.FormGroupUpdate.invalid) {
    //
    //   return;
    // }
    this.ModaleProductionUpdate = this.FormGroupUpdate.value;
    this.openModalUpdate.nativeElement.click();

    //
    this.ProductionsAnnuelService.UpdateProductionsAnnuel(this.ModaleProductionUpdate, this.ModaleProductionUpdate.id).subscribe(value => {
      this.FormGroupUpdate.reset();
      this.getAllProductionsAnnuel();
      this.ModaleProductionUpdate = null;
      this.submittedUpdate = false;

    });
  }

  getPieChart() {
    this.ProductionsAnnuelService.getBarChartProductionAnnuel().subscribe(value => {
      this.modalpieChart = value;
      this.data = [
        {
          'name': 'La productions',
          'series': this.modalpieChart
        }
      ];
    });
  }

  ngAfterViewInit(): void {
  }
}
