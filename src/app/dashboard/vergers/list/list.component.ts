import {Component, OnInit} from '@angular/core';
import {Proprietaires} from '../../../_model/proprietaires';
import {Vergers} from '../../../_model/vergers';
import {VergersService} from '../../../_service/vergers.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import {Image as ImageLayer, Tile as TileLayer, VectorImage} from 'ol/layer';
import * as olProj from 'ol/proj';
import {fromLonLat} from 'ol/proj';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServiceGeoserverService} from '../../../_service/service-geoserver.service';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: number = 1;
  pageevent: number;
  pageSize: number;
  items: number;
  PageResponse: any;
  VergersList: Array<Vergers> = [];
  VergersUpdate: Vergers;
  vectorLayer: any;

  view = new View({
    center: olProj.fromLonLat([-1.47216796875, 12.297068292853817]),
    zoom: 5,
  });

  constructor(private VergersService: VergersService, private ServiceGeoserverService: ServiceGeoserverService) {

  }

  map: Map;

  ngOnInit() {
    this.getVergers(0, 9);

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

    // this.map.addLayer(this.ServiceGeoserverService.getpys());
    //

  }

  getVergers(pageSize, pageNumber) {

    this.VergersService.getPageVergers(pageSize, pageNumber).subscribe(data => {
      this.PageResponse = data;

      this.pageSize = this.PageResponse.pageable.pageSize;
      this.pageevent = this.PageResponse.pageable.pageNumber;
      //
      this.items = this.PageResponse.totalElements;

      this.VergersList = this.PageResponse.content;
      console.log(this.VergersList);
    });
  }

  pageChange($event) {
    this.getVergers($event, 9);


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
        this.VergersService.DeleteVergers(id).subscribe(value => {

        }, error1 => {
        }, () => {
          this.getVergers(this.pageevent, 9);
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

  update(Verger: Vergers) {

  }
  vectorSource:VectorImage;
  Localisation(id: number) {
    this.map.removeLayer(this.vectorSource)
    this.vectorSource = new VectorImage({
      source: new Vector({
        // url: 'http://localhost:8082/geoserver/demo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demo%3AvergerGeojson&maxFeatures=50&outputFormat=application%2Fjson',
        url:'http://localhost:8082/geoserver/OCB/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OCB%3AGetPoitByIdVergers&maxFeatures=50&outputFormat=application%2Fjson&viewparams=id:'+id,
        format: new GeoJSON(),

      })
    });
    this.vectorSource.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: '../assets/images/marker.png',
        anchor: [0.5, 40],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
      }))
    }));

    this.ServiceGeoserverService.getPointVergerById(id).subscribe(data=>{
      // features: Array(1)
      // 0:
      // geometry:
      //   coordinates:
        var GeoJson:any=data;
      console.log(GeoJson.features[0].geometry.coordinates);
      var bern = fromLonLat(GeoJson.features[0].geometry.coordinates);
      this.flyTo(bern, function() {
      })

    });


    this.map.addLayer(this.vectorSource);

    setTimeout(() => {
      this.map.updateSize();
    }, 500);


  }

  flyTo(location, done) {
    var duration = 3000;
    // var zoom = this.view.getZoom();
    var zoom = 11;
    var parts = 5;
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
