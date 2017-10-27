import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {DetailPage} from "../detail/detail";
/**
 * Generated class for the StrategyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-strategy',
  templateUrl: 'strategy.html',
})
export class StrategyPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // public viewCtrl: ViewController,
              public ModCtrl: ModalController

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StrategyPage');
  }
  // back(){
  //   this.viewCtrl.dismiss();
  // }
  todetail(){
    let model=this.ModCtrl.create(DetailPage);
    model.present();
  }
}
