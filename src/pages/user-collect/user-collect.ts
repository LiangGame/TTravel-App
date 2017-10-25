import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

// 导入服务
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service';

/**
 * Generated class for the UserCollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-collect',
  templateUrl: 'user-collect.html',
  providers:[PersonalCenterService,GlobalPropertyService],
})
export class UserCollectPage {
  url:string;
  qnUrl:string;
  collectNotes:any = [];
  user:any;
  reg: any = /<[^>]+>/g;
  _img: any = /<img\s+.*?>/g;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public glo: GlobalPropertyService,
              private storage: Storage,
              public personSer:PersonalCenterService,
              public navParams: NavParams) {
    // 服务器IP地址
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          // console.log(result);
        } else {
          return;
        }
      }).then(() => {
        this.getCollectNotes();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCollectPage');
  }
  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  // 获取收藏
  getCollectNotes(){
    this.collectNotes = [];
    this.personSer.getUserCollect(this.user.id).then(result => {
      if (result) {
        let reg = this.reg;
        for (let i = 0; i < result.length; i++) {
          if((result[i].content).match(this._img)){
            this.collectNotes.push({coverimg:(result[i].content).match(this._img),notes:result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if(result[i].like==''||result[i].like==null){
            result[i].like=0;
          };
          if(result[i].comment==''||result[i].comment==null){
            result[i].comment=0;
          }
        }
        console.log(this.collectNotes);
      }
    })
  }
}
