import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {DetailPage} from "../detail/detail";
import {StrategyService} from "../../services/strategy.service"
import {GlobalPropertyService} from '../../services/global-property.service'

@IonicPage()
@Component({
  selector: 'page-strategy',
  templateUrl: 'strategy.html',
  providers:[StrategyService,GlobalPropertyService]
})
export class StrategyPage {
  _scenic:any=[];
  qnUrl:any;
  allstrategy:any=[];
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // public viewCtrl: ViewController,
              public ModCtrl: ModalController,
              public StrategySer: StrategyService,
              public glo:GlobalPropertyService
  ) {
    this.qnUrl=this.glo.qiniuUrl;
    this.getStrategys();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StrategyPage');
  }

  todetail(id) {
    console.log(id);
    let model = this.ModCtrl.create(DetailPage,{'id':id});
    model.present();
  }

  //刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    let len=this._scenic.length;
    setTimeout(() => {
      for(var i=len;i<len+3;i++){
        if(i <this.allstrategy.length){
          this._scenic.push(this.allstrategy[i] ); // 向末尾push数据
          infiniteScroll.complete();
        }
        else{
          infiniteScroll.enable(false)
        }
      }
    }, 500);
  }
  getStrategys() {
    let that = this;
    that.StrategySer.getStrategy(function (result) {
      if(result){
        for (let i = 0; i < result.length; i++) {
      // console.log(result[i]);
          that.allstrategy.push(result[i])
       }
        for(let i=0;i<5;i++){
          that._scenic.push(result[i]);
        }
        console.log(that._scenic);
      }
    })
  }
}

