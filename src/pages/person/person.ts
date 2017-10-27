import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ModalController} from 'ionic-angular';


import {LoginPage} from '../login/login';
import {GlobalPropertyService} from '../../services/global-property.service';
import {SettingPage} from "../setting/setting";
import {UserIndexPage} from "../user-index/user-index";
import {UserCollectPage} from '../user-collect/user-collect';
import {UserNotesPage} from '../user-notes/user-notes';
import {UserPhotoPage} from '../user-photo/user-photo';
import {UserFootPrintPage} from '../user-foot-print/user-foot-print';
import {UserLvPage} from '../user-lv/user-lv';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  isLogin: boolean = false;
  user: any;
  url: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private glo: GlobalPropertyService,
              public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {


    // 服务器IP地址
    this.url = this.glo.serverUrl;

    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          console.log(result);
          this.isLogin = true;
        } else {
          return;
        }
      });
    });

  }

  // 页面加载完毕触发。
  // ionViewLoaded(){
  //   setInterval(function () {
  //     let img = document.querySelector('.footer_logo').children[0];
  //     img.style.top = '-5px';
  //     setTimeout(function () {
  //       img.style.top = '-3px';
  //     },500)
  //   }, 1000);
  // }

  toLogin() {
    // console.log('toLogin');
    let login = this.modalCtrl.create(LoginPage);
    login.present();
  }

  setting() {
    let modal = this.modalCtrl.create(SettingPage);
    modal.present();
  }

  toIndex(){
    let modal = this.modalCtrl.create(UserIndexPage);
    modal.present();
  }
  toCollect(){
    let modal = this.modalCtrl.create(UserCollectPage);
    modal.present();
  }
  toFootPrint(){
    let modal = this.modalCtrl.create(UserFootPrintPage);
    modal.present();
  }
  toNotes(){
    let modal = this.modalCtrl.create(UserNotesPage);
    modal.present();
  }
  toPhoto(){
    let modal = this.modalCtrl.create(UserPhotoPage);
    modal.present();
  }
  toUserLv(){
    let modal = this.modalCtrl.create(UserLvPage);
    modal.present();
  }
}
