import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {AboutPage} from '../about/about'
import {LoginPage} from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  // 返回
  back() {
    // this.navCtrl.push(TabsPage);
    this.viewCtrl.dismiss();
    // this.navCtrl.pop();
  }

  // 关于
  about() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }

  //退出
  sign_out(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确认退出当前账号?',
      buttons: [
        {
          text: '是',
          handler: () => {
            this.storage.remove('user');
            this.navCtrl.push(LoginPage);

          }
        },
        {
          text: '否',
          handler: () => {
            console.log('否');
          }
        }
      ]
    });
    confirm.present();
  }
}
