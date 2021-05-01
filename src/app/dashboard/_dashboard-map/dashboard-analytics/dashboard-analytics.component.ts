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

}
