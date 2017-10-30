import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ScenicService} from '../../services/scenic.service';
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service'
import {Storage} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-xiangq',
  templateUrl: 'xiangq.html',
  providers:[ScenicService,GlobalPropertyService,PersonalCenterService]
})
export class XiangqPage {
  scenics:any;
  images:any=[];
  qnUrl:any;
  modalInfo: string;
  isLogin: boolean = false;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public viewCtrl: ViewController,
    public scenicSer:ScenicService,
    public glo:GlobalPropertyService,
    public PersonalSer:PersonalCenterService
  ) {
    this.qnUrl=this.glo.qiniuUrl;
    // this.footprint();

  }

  ionViewDidLoad() {

    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          console.log(result);
        } else {
          return;
        }
      });
    });

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
            that.images = result[0].url.split(',');
            console.log(result);
          }
        })
      }
  }
  footprint(id) {

    let body = {userId: this.user.id, scenicId: id};
    console.log(body);
    let that = this;
    console.log('景点ID:' + id);
    that.PersonalSer.addFootPorint(body, function (result) {
      console.log(result);
      if (result) {
        if (result.stateCode == '001') {
          that.modalInfo = '添加成功!';
          console.log(that.modalInfo);
        } else {
          that.modalInfo = '添加失败!';
        }
      }
    })
  }
}
