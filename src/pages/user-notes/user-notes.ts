import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

// 导入服务
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service';

/**
 * Generated class for the UserNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-notes',
  templateUrl: 'user-notes.html',
  providers:[PersonalCenterService,GlobalPropertyService],

})
export class UserNotesPage {
  url:string;
  qnUrl:string;
  user:any;
  notes:any = [];
  _check: any = [];
  ischeck: any = [];
  nocheck: any = [];
  reg: any = /<[^>]+>/g;
  _img: any = /<img\s+.*?>/g;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private storage: Storage,
              private glo: GlobalPropertyService,
              private personSer:PersonalCenterService) {
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
        this.getUserNotes();
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNotesPage');
  }
  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  // 获取该用户游记
  getUserNotes(){
    this.personSer.show_notes({userId:this.user.telephone}).then((result) => {
      // console.log('getUserNotes');
      // console.log(result);
      // this.notes = result;
      if (result) {
        let reg = this.reg;
        for (let i = 0; i < result.length; i++) {
          // console.log((result[i].content).match(that._img));
          if ((result[i].content).match(this._img)) {
            this.notes.push({coverimg: (result[i].content).match(this._img), notes: result[i]})
          } else {
            this.notes.push({coverimg: [`<img src="${this.url}/uploads/notesDefault.jpeg">`], notes: result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          };
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          };
          if (result[i].collect == '' || result[i].collect == null) {
            result[i].collect = 0;
          }
          // console.log(i);
          // console.log(that.newNotes);

          if (this.notes[i].notes.check == '0') {
            this._check.push(this.notes[i]);
          } else if (this.notes[i].notes.check == '1') {
            this.ischeck.push(this.notes[i]);
          } else {
            this.nocheck.push(this.notes[i]);
          }
        }
        console.log(this._check);
        console.log(this.ischeck);
        console.log(this.nocheck);

      }
    })
  }



  // 展开
  check_toggle(event){
    let display = event.target.nextElementSibling.style.display;
    if(display === 'none'){
      event.target.nextElementSibling.style.display = 'block';
    }else{
      event.target.nextElementSibling.style.display = 'none';
    }
  }
}
