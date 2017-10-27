import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ScenicService} from '../../services/scenic.service';
import {GlobalPropertyService} from '../../services/global-property.service'

@IonicPage()
@Component({
  selector: 'page-xiangq',
  templateUrl: 'xiangq.html',
  providers:[ScenicService,GlobalPropertyService]
})
export class XiangqPage {
  scenics:any;
  images:any=[];
  qnUrl:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public scenicSer:ScenicService,
    public glo:GlobalPropertyService
  ) {
    this.qnUrl=this.glo.qiniuUrl

  }

  ionViewDidLoad() {
    let id=this.navParams.get('id');
    this.get_scenic(id);
    console.log(id);
    console.log('ionViewDidLoad XiangqPage');
  }
  back() {
    this.viewCtrl.dismiss();
  }


  get_scenic(id) {
      if (id) {
        let that = this;
        id = {"id": id};
        that.scenicSer.getScenicItem(id, function (result) {
          if (result) {
            that.scenics = result[0];
            that.images =(result[0].url.split(','));
            console.log(result);
          }
        })
      }
  }
}
