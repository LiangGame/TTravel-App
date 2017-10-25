import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {ParticularsPage} from "../particulars/particulars";


@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  datas=[
    {
    title:'在路上',
    img:'05.jpeg',
    content:'jdkhflsfdiefsfsggdfggdgdgdfgfdgdgdgdgfefifhu',
    authorName:'Tom',
  },
    {
      title:'在路上',
      img:'05.jpeg',
      content:'jdkhflsfdiefefifhu',
      authorName:'Tom',
    },
    {
      title:'在路上',
      img:'05.jpeg',
      content:'jdkhflsfdiefefifhu',
      authorName:'Tom',
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // public viewCtrl: ViewController,
    public ModCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  toparticulars(){
    let model=this.ModCtrl.create(ParticularsPage);
    model.present();
  }
}
