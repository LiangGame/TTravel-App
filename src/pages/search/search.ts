import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {LiebiaoPage} from '../liebiao/liebiao';
import {CityPage} from '../city/city';

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
    public viewCtrl: ViewController,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
  toliebiao(txt){
    console.log(txt);
    let model = this.ModalCtrl.create(LiebiaoPage,{'key':txt});
      model.present();
  }

}
