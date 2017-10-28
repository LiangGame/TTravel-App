import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs'
import {HomePage} from '../home/home'
import {RegistPage} from '../regist/regist';

// 导入服务
import {UserService} from '../../services/user.service'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
  loginForm: FormGroup;
  username: any;
  password: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private userSer: UserService,
              private storage: Storage,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,) {
    // 表单验证
    this.loginForm = formBuilder.group({

      telephone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11),
        Validators.required /*为空验证*/,
        Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.username = this.loginForm.controls['telephone'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }
  toRegist() {
    let regist = this.modalCtrl.create(RegistPage);
    regist.present();
  }
  // 返回
  back() {
    this.navCtrl.push(TabsPage);
    // this.viewCtrl.dismiss();
    // this.navCtrl.pop();
  }

  // 登录
  login(data) {
    // console.log(data);
    this.userSer.login(data).then((result) => {
      if (result) {
        console.log(result);
        if (result.stateCode === 1) {
          this.navCtrl.push(TabsPage);

          this.storage.set('user', result.users);
          this.storage.set('token', result.token);
        }else if(result.stateCode === 9){
          let toast = this.toastCtrl.create({
            message: '密码错误',
            duration: 2000,
          });
          toast.present(toast);
        }else if(result.stateCode === 3){
          let toast = this.toastCtrl.create({
            message: '该用户不存在',
            duration: 2000,
          });
          toast.present(toast);
        }
      }
    })
  }

}
