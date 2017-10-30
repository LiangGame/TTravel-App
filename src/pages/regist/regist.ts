import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';

import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';
import {UserService} from '../../services/user.service';
import {TabsPage} from '../tabs/tabs'
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
  providers:[UserService]
})
export class RegistPage {
  registForm: FormGroup;
  userName: any;
  password: any;
  telephone:any;
  phoneCode:any;
  get: string = '获取验证码';
  one: boolean = false;
  s: number = 60;
  isphoneCode: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage,
              public toastCtrl: ToastController,
              public userSer:UserService) {

    this.registForm = formBuilder.group({

      telephone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11),
        Validators.required /*为空验证*/,
        Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      userName:['',Validators.required /*为空验证*/]
    });

    this.telephone = this.registForm.controls['telephone'];
    this.password = this.registForm.controls['password'];
    this.userName = this.registForm.controls['userName'];
  }

  ionViewDidLoad() {

  }

  back() {
    this.navCtrl.push(LoginPage);
    // this.viewCtrl.dismiss();
    // this.navCtrl.pop();
  }
  getPhoneCode(tel){
    console.log(tel);
    let that = this;
    this.get = '重新获取';
    this.one = true
    that.isphoneCode = false;
    var Interval = setInterval(function () {
      that.s = that.s - 1;
      if(that.s == 0){
        that.one = false;
        that.s = 60;
        that.isphoneCode = true;
        clearInterval(Interval);
        return;
      }
    }, 1000);
    // console.log(tel);
    this.userSer.sendCode(tel, function (result) {
      that.phoneCode = result.infoNum;
      // console.log(that.phoneCode);
    });
  }
  regist(data) {
    console.log(data);
    let that = this;
    that.userSer.addUser(data, function (result) {
      console.log(result);
      if (result.stateCode == '6') {
        that.navCtrl.push(TabsPage);
        var user = {telephone: data.telephone, password: data.password}
        that.userSer.getByPwd(user, function (result) {
          console.log(result);
          // console.log(">>>>>>>>>>>>>>>>>>>>");
          // sessionStorage.setItem('user', JSON.stringify(result.users[0]))
          // that.router.navigate(['/index']);

        })
      }
      if (result.stateCode == '7') {
        // that.register_res = '用户已注册';
      }

    })
  }
}

