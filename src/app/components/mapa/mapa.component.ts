import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
//  @ViewChild('mapa', {static: false}) mapa;

  constructor() { }

  ngOnInit() {

    if (this.coords) {

      const latLng = this.coords.split(',');
      const lat = Number(latLng[0]);
      const lng = Number(latLng[1]);

      mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhcXVlZGFubyIsImEiOiJjazAyc3I5b2Yyc3VoM2Jtdm1pM3VyNGtwIn0.Z2WDnPSn_j_ls5ezB9TSoQ';
      const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
      });
      const marker = new mapboxgl.Marker()
      .setLngLat( [lng, lat] )
      .addTo(map);

    }

  }

}
