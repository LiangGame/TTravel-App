import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController,ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {UserService} from '../../services/user.service';

/**
 * Generated class for the UpdataUserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updata-user-info',
  templateUrl: 'updata-user-info.html',
  providers:[UserService]
})
export class UpdataUserInfoPage {
  userSex: any;
  userName: any;
  address: any;
  Signature: any;
  change:boolean = false;
  user:any;
  birthday:any = {};

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private storage: Storage,
              public userSer:UserService,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          this.userName = result[0].userName;
          this.address = result[0].cityname.substring(0,result[0].cityname.length - 1);
          this.Signature = result[0].signature;
          if (result[0].sex) {
            this.userSex = '男';
          } else {
            this.userSex = '女';
          };
          let day = ('' + new Date(''+result[0].birthday).toLocaleDateString()).replace(/\//gi, '-');
          this.birthday = {day:day};
        } else {
          return;
        }
      });
    });
    console.log('ionViewDidLoad UpdataUserInfoPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  checkSex() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '男',
          handler: () => {
            this.userSex = '男';
            console.log('Destructive clicked');
          }
        }, {
          text: '女',
          role: 'destructive',
          handler: () => {
            this.userSex = '女';
            console.log('Archive clicked');
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  _change(){
    this.change = true;
    console.log(this.change);
  }

  save(userInfo){
    // console.log(userInfo.form.value);
    if(userInfo.form.value.userSex == '男'){
      userInfo.form.value.sex = 0;
      this.user.sex = 0;
    }else {
      userInfo.form.value.userSex = 1;
      this.user.sex = 1;
    }
    userInfo.form.value.city = 1;
    let user = [userInfo.form.value, {"telephone": this.user.telephone}];
    this.userSer.updateUser(user).then(result => {
      if(result.stateCode && result.stateCode == 6){
        let toast = this.toastCtrl.create({
          message: '修改信息成功',
          duration: 2000,
        });
        toast.present(toast);
        this.user.userName = userInfo.form.value.userName;
        this.user.signature = userInfo.form.value.Signature;
        this.user.cityname =  userInfo.form.value.address;

        // if(userInfo.form.value == '男'){
        //   this.user.userSex = 0;
        // }else {
        //   this.user.userSex = 1;
        // }
        this.storage.set('user',this.user);
      }
    })
  }

}
