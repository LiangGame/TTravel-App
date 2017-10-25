import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {LiebiaoPage} from '../liebiao/liebiao';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ModalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  toliebiao(){
      let model = this.ModalCtrl.create(LiebiaoPage);
      model.present();
  }
}
