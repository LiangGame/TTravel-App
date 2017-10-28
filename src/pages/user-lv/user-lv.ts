import { Component,Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {GlobalPropertyService} from '../../services/global-property.service'
/**
 * Generated class for the UserLvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-lv',
  templateUrl: 'user-lv.html',
  providers:[GlobalPropertyService]
})
export class UserLvPage {
  userlv:number;
  lv:number;
  lvName:string;
  hLv:number;
  userName:string;
  userIcon:string;
  url:string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private storage: Storage,
              public navParams: NavParams,
              public renderer: Renderer2,
              public glo:GlobalPropertyService) {
    this.url = this.glo.serverUrl;
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.userlv = result[0].userlv;
          this.lvName = result[0].lvName;
          this.userName = result[0].userName;
          this.userIcon = result[0].icon;
          console.log(this.userlv);
        } else {
          return;
        }
      }).then(() => {
        if(this.userlv <= 100){
          this.lv = 100;
        }else if(this.userlv >= 100 && this.userlv  <= 500 ){
          this.lv = 500;
        }else if(this.userlv >= 500 && this.userlv <= 1500){
          this.lv = 1500;
        }else if(this.userlv >= 1500 && this.userlv <= 3000){
          this.lv = 3000;
        }else if(this.userlv >= 3000 && this.userlv <= 5000){
          this.lv = 5000;
        }else {
          this.lv = 6000;
        }
        this.hLv = this.lv - this.userlv;
        let rang = document.querySelector('.range-knob-handle');
        let left = +this.userlv / this.lv * 100;
        let right = (100 - left);
        let el = document.querySelector('.range-bar-active');

        this.renderer.setStyle(el, 'right', right + '%');
        this.renderer.setStyle(rang, 'left', left + '%');

      });
    })
    console.log('ionViewDidLoad UserLvPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }
}
