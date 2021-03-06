import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';
import {ScenicPage} from '../scenic/scenic';
import {XiangqPage} from '../xiangq/xiangq';
import {ScenicService} from '../../services/scenic.service';
import {GlobalPropertyService} from '../../services/global-property.service'

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-liebiao',
  templateUrl: 'liebiao.html',
  providers:[ScenicService,GlobalPropertyService]
})
export class LiebiaoPage {
  qnUrl: any;
  private data: any;
  private key: any;
  city: any;
  cityinfo: any;
  searchtxt:any;


  yuyan=['景点概况:','城市很秀气，风景和人文感觉都很好。','知名旅游景点非常多，苏州园林则是最有名的景点。','山塘街夜景很美，很有特色，观前街很热闹小吃也多。','温婉的江南水乡是一座适合生活的安逸城市。']
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public ModalCtrl: ModalController,
              public ScenicSer: ScenicService,
              public Glo:GlobalPropertyService
  ) {
    this.qnUrl=this.Glo.qiniuUrl
    // this.xiang();
  }
  ionViewDidLoad() {
    let key=this.navParams.get('key');
    this.xiang(key);
    console.log(key);
    console.log('ionViewDidLoad LiebiaoPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }
  xiang(key){
    if (key) {
      let that = this;
      that.ScenicSer.get_scenic(function (result) {
        // console.log(result);
        if (result) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].url == '' || result[i].url == null) {
              continue;
            } else {
              result[i].url = (result[i].url).split(',');
            }
            that.city = result[0].cityname;
            if (result[i].cityname.indexOf(key) != -1
              || result[i].title.indexOf(key) != -1
              || result[i].info.indexOf(key) != -1) {
              console.log(result[i].cityinfo);
              that.cityinfo = result[i].cityinfo;
            }
          }
          that.data = result;
          that.searchtxt = key;
        }
      })
    }
  }
  toxiangq(id){
    let model = this.ModalCtrl.create(XiangqPage,{'id': id});
    model.present();
  }


/*  //上拉加载
  doInfinite(infiniteScroll) {
    let that = this;
    let len=this.newdata.length;
    setTimeout(() => {
      for(var i=len;i<len+3;i++){
        if(i <this.data.length){
          this.newdata.push(this.data[i] ); // 向末尾push数据
          infiniteScroll.complete();
        }
        else{
          infiniteScroll.enable(false)
        }
      }
      infiniteScroll.complete();
    }, 500);
  }*/
}
