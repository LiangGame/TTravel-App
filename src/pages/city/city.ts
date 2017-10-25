import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import {ScenicPage} from '../scenic/scenic';
@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ModalCtrl: ModalController,
              public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }

  back() {
    this.viewCtrl.dismiss( );
  }
}
