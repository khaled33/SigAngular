import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import {Image as ImageLayer, Tile as TileLayer, VectorImage} from 'ol/layer';
import {map} from 'rxjs/operators';
import Projection from 'ol/proj/Projection';
import {fromLonLat} from 'ol/proj';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import {ServiceGeoserverService} from '../../../_service/service-geoserver.service';
import {ListboxModule} from 'primeng/listbox';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.css']
})
export class DashboardMapComponent implements OnInit {
  cities: any[];
  cities1: any[] = [];
  data: any;
  view = new View({
    center: olProj.fromLonLat([-1.47216796875, 12.297068292853817]),
    zoom: 5,
  });
  selectedCity: any;
  type: string[] = [];
  selectedCities: any[];
  vectorLayer: any;

  constructor(private ServiceGeoserverService: ServiceGeoserverService) {
    this.cities = [
      {name: 'Boucle du Mouhoun', code: 'PRS'},
      {name: 'Cascades', code: 'PRS'},
      {name: 'Centre', code: 'PRS'},
      {name: 'Centre-Est', code: 'PRS'},
      {name: 'Centre-Nord', code: 'PRS'},
      {name: 'Centre-Ouest', code: 'PRS'},
      {name: 'Centre-Sud', code: 'PRS'},
      {name: 'Est', code: 'PRS'},
      {name: 'Hauts-Bassins', code: 'PRS'},
      {name: 'Nord', code: 'PRS'},
      {name: 'Plateau-Central', code: 'PRS'},
      {name: 'Sahel', code: 'PRS'},
      {name: 'Sud-Ouest', code: 'PRS'},
    ];

  }

  map: Map;

  ngOnInit(): void {
    var displaye: boolean = false;

    var projection = new Projection({
      code: 'EPSG:21781',
      units: 'm',
    });

    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      vectorLayer: this.vectorLayer,
      view: this.view,
    });

    this.map.addLayer(this.ServiceGeoserverService.getpys());
    //


    this.map.on('click', (e) => {

      this.map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
        document.getElementById('id').click();

        var tab = document.getElementById('modal-body');
        tab.innerHTML = '<table class="table ">\n' +
          '          <thead>\n' +
          '          <tr>\n' +
     /*     '            <th scope="col">Nom proprietaire </th>\n' +
          '            <th scope="col">Prenom proprietaires</th>\n' +
          '            <th scope="col">Adress proprietaires</th>\n' +*/
          '            <th scope="col">Rendemen Verger</th>\n' +
          '            <th scope="col">Superfic Verger</th>\n' +
          '            <th scope="col">Age moye Verger</th>\n' +
          '            <th scope="col">Densites Verger</th>\n' +
          '          </tr>\n' +
          '\n' +
          '\n' +
          '\n' +
          '          </thead>\n' +
          '          <tbody id="tbody">\n' +
          '          <tr>\n' +
          // '            <td>' + feature.values_.nom + '</td>\n' +
          // '            <td>' + feature.values_.prenom + '</td>\n' +
          // '            <td>' + feature.values_.adress + '</td>\n' +
          '            <td>' + feature.values_.rendements + '</td>\n' +
          '            <td>' + feature.values_.superficies + '</td>\n' +
          '            <td>' + feature.values_.age_moyen + '</td>\n' +
          '            <td>' + feature.values_.densites + '</td>\n' +
          '          </tr>\n' +
          '\n' +
          '          </tbody>\n' +
          '        </table>';
        console.log(feature.values_);


      });
    });
  }

  title = 'openlayar';

  getAlltype() {
    this.ServiceGeoserverService.getAlltype().subscribe(value => {
        this.data = value;
        for (let i = 0; i < 21; i++) {

          this.cities1.push({name: this.data.features[i].properties.type, code: 'PRS'});

        }
        this.cities = this.cities1;

      }, error1 => {
      }
      , () => {

      });
  }

  parm: ImageLayer;
  display: any;

  onChange($event: any) {
    console.log(this.map.getLayers());

    if ($event.value.name === 'Est') {
      var bern = fromLonLat([  -1.77978515625,
        12.576009912063801]);
      this.flyTo(bern, function() {
      });


      this.ServiceGeoserverService.getVergerAllGeoJson().subscribe(value => {

        var vectorSource = new VectorImage({
          source: new Vector({
            // url: 'http://localhost:8082/geoserver/demo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demo%3AvergerGeojson&maxFeatures=50&outputFormat=application%2Fjson',
            url: 'http://localhost:8082/geoserver/OCB/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OCB%3AGetAllVergers&maxFeatures=50&outputFormat=application%2Fjson',
            format: new GeoJSON(),

          })
        });

        vectorSource.setStyle(new Style({
          image: new Icon(({
             crossOrigin: 'anonymous',
            src: '../assets/images/marker.png',
            anchor: [0.5, 40],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
          }))
        }));

        this.map.addLayer(vectorSource);
        console.log(vectorSource);

      });

      // this.map.addvectorLay()


    }

    // this.map.removeLayer(this.parm);
    // this.parm=this.ServiceGeoserverService.getStrit($event.value.name);
    // this.map.addLayer(this.parm);

  }

  flyTo(location, done) {
    var duration = 2000;
    // var zoom = this.view.getZoom();
    var zoom = 8;
    var parts = 8;
    var called = false;

    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }

    this.view.animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );
    this.view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom,
        duration: duration / 2,
      },
      callback
    );
  }
  }
