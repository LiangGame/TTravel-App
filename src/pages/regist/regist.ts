import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {LoginPage} from '../login/login';
import {UserService} from '../../services/user.service';

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
  username: any;
  password: any;
  myname:any;
  phoneCode:any;
  get: string = '获取验证码';
  one: boolean = false;
  s: number = 60;
  isphoneCode: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public userSer:UserService) {

    this.registForm = formBuilder.group({

      telephone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11),
        Validators.required /*为空验证*/,
        Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      myname:['',Validators.required /*为空验证*/]
    });

    this.username = this.registForm.controls['telephone'];
    this.password = this.registForm.controls['password'];
    this.myname = this.registForm.controls['myname'];
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

}

