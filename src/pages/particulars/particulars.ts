import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html',
})
export class ParticularsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }
back(){
  this.viewCtrl.dismiss();
}

}
