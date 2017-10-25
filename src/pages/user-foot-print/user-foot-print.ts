import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

// 导入服务
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service';

/**
 * Generated class for the UserFootPrintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-foot-print',
  templateUrl: 'user-foot-print.html',
  providers: [PersonalCenterService, GlobalPropertyService],

})
export class UserFootPrintPage {
  url: string;
  qnUrl: string;
  user: any;
  footPrint: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private storage: Storage,
              private glo: GlobalPropertyService,
              private personSer: PersonalCenterService) {
    // 服务器IP地址
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;


    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          this.getFootPrint();
          // console.log(result);
        } else {
          return;
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFootPrintPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  // 获取足迹
  getFootPrint() {
    this.personSer.getAllFootPorint({userId: this.user.id}).then(result => {
      console.log(result);
      if (result) {
        for (let i = 0; i < result.length; i++) {
          result[i].url = (result[i].url).split(',')[0];
        }
      }
      this.footPrint = result;
    })
  }
}
