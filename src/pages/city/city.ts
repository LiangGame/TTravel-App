import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
// import {ScenicPage} from '../scenic/scenic';
import {LiebiaoPage} from '../liebiao/liebiao';
import {ScenicService}from '../../services/scenic.service'
@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
  providers:[ScenicService]
})
export class CityPage {
  east: any = [];   // 东
  south: any = [];  // 南
  west: any = [];  // 中
  north: any = [];// 北
  south_west: any = [];// 西南
  north_west: any = [];// 西北
  north_east: any = [];// 东北
   diqu=['华东地区','华北地区','华南地区','华中地区','东北地区','西北地区','西南地区'];
  pet: string ="华东地区";
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public ModalCtrl: ModalController,
              public viewCtrl: ViewController,
              public scenicSer: ScenicService
  ) {
  }
  ionViewDidLoad() {
    this.getcity();
    console.log('ionViewDidLoad CityPage');
  }

  back() {
    this.viewCtrl.dismiss( );
  }

  getcity() {
    let that = this;
    that.scenicSer.getCitys(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].type.indexOf('华东地区') != -1) {
            that.east.push(result[i]);
          } else if (result[i].type.indexOf('华南地区') != -1) {
            that.south.push(result[i]);
          } else if (result[i].type.indexOf('华中地区') != -1) {
            that.west.push(result[i]);
          } else if (result[i].type.indexOf('华北地区') != -1) {
            that.north.push(result[i]);
          } else if (result[i].type.indexOf('西南地区') != -1) {
            that.south_west.push(result[i]);
          } else if (result[i].type.indexOf('西北地区') != -1) {
            that.north_west.push(result[i]);
          } else {
            that.north_east.push(result[i]);
          }
        }
      }

      console.log('华东地区');
      console.log(that.east);
      console.log('华南地区');
      console.log(that.south);
      console.log('华中地区');
      console.log(that.west);
      console.log('华北地区');
      console.log(that.north);
      console.log('西南地区');
      console.log(that.south_west);
      console.log('西北地区');
      console.log(that.north_west);
      console.log('东北地区');
      console.log(that.north_east);
    })
  }
  tulie(name){
    console.log(name);
    let model=this.ModalCtrl.create(LiebiaoPage,{'key':name});
    model.present();
  }
}
