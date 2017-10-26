import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

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
})
export class UserLvPage {
  userlv:number;
  lv:number;
  lvName:string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.userlv = result[0].userlv;
          this.lvName = result[0].lvName
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

        let rang = document.querySelector('.range-knob-handle');
        let left = +this.userlv / this.lv * 100;
        let right = (100 - left);
        document.querySelector('.range-bar-active').style.right = right + '%';
        console.log(left);
        rang.style.left = left + '%';
        console.log(rang.style.left);
      });
    })
    console.log('ionViewDidLoad UserLvPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }
}
