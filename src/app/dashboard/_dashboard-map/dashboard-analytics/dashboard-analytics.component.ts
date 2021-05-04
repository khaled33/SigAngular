import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DashboardHeadService} from '../../../_service/dashboard-head.service';
import {DashboardHeadStatistic} from '../../../_model/DashboardHeadStatistic';
import {PieChartService} from '../../../_service/PieChart.service';
import {pieChart} from '../../../_model/pieChart';
import {ProductionsAnnuelService} from '../../../_service/ProductionsAnnuel.service';
import {AnneeProduction} from '../../../_model/productions-annuel';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {
  modalDashboardHeadStatistic: DashboardHeadStatistic;
  modalpieChart: pieChart[];
  title = 'Angular Charts';
  ModaleProductionList:AnneeProduction[];

  view: any[] = [750, 400];
  viewpie: any[] = [800, 450];
  viewLighne: any[] = [1000, 300];

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

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  //pie
  showLabels = true;
  // data goes here
  single = [];
  // data pie chart here
  public dataLignechar = [];

  constructor(private dashboardHeadService: DashboardHeadService, private ProductionsAnnuelService: ProductionsAnnuelService, private PieChartService: PieChartService) {

    if (innerWidth >= 500 && innerWidth <= 980) {
      this.view = [innerWidth / 1.27, 400];
      this.viewpie = [innerWidth / 1.27, 460];
      this.viewLighne = [innerWidth / 1.30, 460];


    }else if(innerWidth >= 1166 && innerWidth <= 1650) {
      this.view = [innerWidth /3, 400];
      this.viewpie = [innerWidth / 3, 460];
      this.viewLighne = [innerWidth / 2.1, 290];
    }else {
      this.view = [innerWidth /2.6, 400];
      this.viewpie = [innerWidth / 2.6, 460];
      this.viewLighne = [innerWidth /1.90, 290];

    }

  }

  ngOnInit() {
    this.getDashboardHead();
  }

  onSelect($event: Event | any) {
    console.log($event);
  }

  getDashboardHead() {
    this.dashboardHeadService.getDashboardHead().subscribe(value => {
      this.modalDashboardHeadStatistic = value;
      console.log(this.modalDashboardHeadStatistic);
    });
  }

  getPieChart() {
    this.PieChartService.getDataPieCharSexe().subscribe(value => {
      this.modalpieChart = value;
    });
  }

  getBarChartProductionAnnuel() {
    this.ProductionsAnnuelService.getBarChartProductionAnnuel().subscribe(value => {
      // this.single[0].series=value;
      console.log(value);
      this.single =
        [
          {
            'name': 'Production Annuel',
            'series': value
          }


        ];
      this.dataLignechar =
        [
          {
            'name': 'Production Annuel',
            'series': value
          }


        ];
    });
  }

  ngAfterViewInit(): void {
    this.getPieChart();
    this.getBarChartProductionAnnuel();
    this.getAllProductionsAnnuel();

  }

  getAllProductionsAnnuel(){
    this.ProductionsAnnuelService.getPageProductionsAnnuel().subscribe(value => {
      this.ModaleProductionList=value;
    })
  }

  onResize($event) {
    if (innerWidth >= 500 && innerWidth <= 980) {
      this.view = [innerWidth / 1.27, 400];
      this.viewpie = [innerWidth / 1.27, 460];
      this.viewLighne = [innerWidth / 1.30, 460];


    }else if(innerWidth >= 1166 && innerWidth <= 1650) {
      this.view = [$event.target.innerWidth /3, 400];
      this.viewpie = [innerWidth / 3, 460];
      this.viewLighne = [$event.target.innerWidth / 2.1, 290];
    }else {
      this.view = [$event.target.innerWidth /2.6, 400];
      this.viewpie = [innerWidth / 2.6, 460];
      this.viewLighne = [$event.target.innerWidth /1.90, 290];

    }




  }
}
