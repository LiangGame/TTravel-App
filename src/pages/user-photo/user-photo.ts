import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

// 导入服务
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service';

/**
 * Generated class for the UserPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-photo',
  templateUrl: 'user-photo.html',
  providers:[PersonalCenterService,GlobalPropertyService],
})
export class UserPhotoPage {
  url:string;
  userImg:any = [];
  user:any;


  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private storage: Storage,
              private glo: GlobalPropertyService,
              private personSer:PersonalCenterService) {
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
      }).then(() => {
        this.getUserImages();
      });
    });


    console.log('ionViewDidLoad UserPhotoPage');
  }
  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  // 获取用户照片

  getUserImages(){
    this.personSer.getUserImages({userId:this.user.id}).then(result => {
      // this.userImg = result;
      if (result) {
        for (let i = 0; i < result.length; i++) {
          this.userImg[i] = `<img src="${this.url}/userImgs/${result[i].url}" alt="" height="auto">`;
        }
      }
      console.log(this.userImg);

    })
  }
}
