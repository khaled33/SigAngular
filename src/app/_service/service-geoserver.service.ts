import { Injectable } from '@angular/core';
import {Image as ImageLayer, Tile as TileLayer, VectorImage} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import {HttpClient} from '@angular/common/http';
 import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import Vector from 'ol/source/Vector';
import Icon from 'ol/style/Icon';


@Injectable({
  providedIn: 'root'
})
export class ServiceGeoserverService {

  constructor(private http: HttpClient) { }
  imageLayer:ImageLayer;
  getStrit(parm:string){





    var styles = [
      /* We are using two different styles for the polygons:
       *  - The first style is for the polygons themselves.
       *  - The second style is to draw the vertices of the polygons.
       *    In a custom `geometry` function the vertices of a polygon are
       *    returned as `MultiPoint` geometry, which will be used to render
       *    the style.
       */
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'orange',
          }),
        }),

      }) ];








    this.imageLayer = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8082/geoserver2/demo/wms?service=WMS&version=1.1.0&request=GetMap&layers=demo:query&styles=&bbox=205723.7692685683,3128220.0382689075,794276.2307314316,9329005.182357315&width=330&height=768&srs=EPSG:26918&format=application/openlayers&viewparams=type:'+parm,
        // params: {'LAYERS': 'topp:states',VERSION:'1.1.1',FORMAT: 'application/openlayers' },
        serverType: 'geoserver',

      }),
      style : styles
    });
return this.imageLayer;
  }
  getpys( ){

    this.imageLayer = new ImageLayer({
      source: new ImageWMS({
        url:'http://localhost:8082/geoserver/demo/wms?service=WMS&version=1.1.0&request=GetMap&layers=demo%3Agadm36_bfa_0&bbox=-5.518918514251709%2C9.401107788085938%2C2.405400276184082%2C15.082592010498047&width=768&height=550&srs=EPSG%3A4326&styles=&format=application/openlayers',
       // params: {  },
        serverType: 'geoserver',

      }),

    });
return this.imageLayer;
  }
  getVerger( ){

    this.imageLayer = new ImageLayer({
      source: new ImageWMS({
        url:'http://localhost:8082/geoserver/demo/wms?service=WMS&version=1.1.0&request=GetMap&layers=demo%3Averger&bbox=0.759429931640625%2C11.46656608581543%2C1.420497894287109%2C12.055438041687012&width=768&height=684&srs=EPSG%3A4326&styles=&format=application/openlayers',
       // params: {  },
        serverType: 'geoserver',

      }),

    });
return this.imageLayer;
  }


  getAlltype(){
   var url=' http://localhost:8082/geoserver2/demo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demo:getType&maxFeatures=50&outputFormat=application%2Fjson';
    return this.http.get(url);

  }

  getVergerAllGeoJson(){

    var url='http://localhost:8082/geoserver/demo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demo%3AvergerGeojson&maxFeatures=50&outputFormat=application%2Fjson';
    return this.http.get(url);

  }


  getPointVergerById(id:number ){

    return this.http.get('http://localhost:8082/geoserver/OCB/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OCB%3AGetPoitByIdVergers&maxFeatures=50&outputFormat=application%2Fjson&viewparams=id:'+id
  );
  }

}
