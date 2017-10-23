import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {GlobalPropertyService} from '../../services/global-property.service';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the UserIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-index',
  templateUrl: 'user-index.html',
})
export class UserIndexPage {
  url:string;
  user:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private storage: Storage,
              private glo: GlobalPropertyService,) {
    // 服务器IP地址
    this.url = this.glo.serverUrl;
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          // console.log(result);
        } else {
          return;
        }
      });
    });
    console.log('ionViewDidLoad UserIndexPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }


}
