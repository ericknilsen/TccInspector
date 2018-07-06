import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;

  constructor() {

  }



}
