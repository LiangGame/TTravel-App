import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {StrategyService} from '../../services/strategy.service'

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
    providers:[StrategyService]
})
export class DetailPage {
  private key: any;
  data: any;
  up:string = 'down';
  searText: any;
  _img: any = /<img\s+.*?>/g;
  imgs:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public StrategySer:StrategyService
  ) {
  }
  ionViewDidLoad() {
    let id=this.navParams.get('id');
    this.xiangqing(id);
    console.log(id);
    console.log('ionViewDidLoad DetailPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }

  xiangqing(id){
    let that = this;
    id = {"styategyId": id};
    that.StrategySer.getStrategyItem(id, function (result) {
      console.log(result);
      if (result) {
        console.log(result);
        that.data = result[0];
        that.searText = that.key;
        // let len = (result[0].content).match(that._img)
        that.imgs = (result[0].content).match(that._img);
        console.log(that.imgs);
      } else {
        // console.log('error');
      }
    });
  }
}

