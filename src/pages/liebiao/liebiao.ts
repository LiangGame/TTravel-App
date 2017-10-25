import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ScenicPage} from '../scenic/scenic';
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-liebiao',
  templateUrl: 'liebiao.html',
})
export class LiebiaoPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiebiaoPage');
  }
back(){
  this.viewCtrl.dismiss();
}

}
