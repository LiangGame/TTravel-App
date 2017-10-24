import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {CityPage} from '../city/city';

@IonicPage()
@Component({
  selector: 'page-scenic',
  templateUrl: 'scenic.html',
})
export class ScenicPage {
  //默认选中
  pet: string ="俯瞰城市";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ModalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScenicPage');
  }
  tocity(){
    let model = this.ModalCtrl.create(CityPage);
    model.present();
  }
}
