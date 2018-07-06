import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Events } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') private mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events) {

      this.events.subscribe('country:changed', (country) => {

          this.loadMap(country.latlng)
      });


  }

  ionViewDidLoad() {
    this.loadMap([-12.9704,-38.5124])

  }


  loadMap(latlngArray: number[]){

    let latLng = new google.maps.LatLng(latlngArray[0],latlngArray[1]);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

}
