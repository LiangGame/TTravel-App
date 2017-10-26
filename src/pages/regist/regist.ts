import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {LoginPage} from '../login/login';


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
})
export class RegistPage {
  registForm: FormGroup;
  username: any;
  password: any;
  myname:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,) {

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

}

