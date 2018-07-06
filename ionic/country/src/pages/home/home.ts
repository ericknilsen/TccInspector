import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {Country} from '../../models/country'
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: Country[];

  countriesListFilter: Country[];
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public navParams: NavParams,
              public events: Events) {


  }

  ionViewDidLoad() {
    this.getCountries();
  }


  goMapCoordinates(c: Country) {

    this.events.publish('country:changed', c);

    var t: any = this.navCtrl.parent
    t.select(1)
  }

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => this.countries = this.countriesListFilter = countries,
         error =>  this.errorMessage = <any>error);
  }


  getItems(searchbar) {
    this.countries = this.countriesListFilter

    var q = searchbar.srcElement.value;

    if (!q) {
      return;
    }

    this.countries = this.countries.filter((v) => {
      if(v && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
