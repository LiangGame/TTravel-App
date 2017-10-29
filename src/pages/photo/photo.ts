import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {TravelAlbumService} from '../../services/travel-album.service';
import {ParticularsPage} from "../particulars/particulars"
@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [TravelAlbumService]
})
export class PhotoPage {
  notes: any;
  allphooto: any = [];
  newphooto: any = [];
  reg: any = /<img\s+.*?>/g;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public albumSer: TravelAlbumService,
              public ModalCtrl: ModalController,) {
    this.huoqu();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }

  huoqu() {
    let that = this;
    that.albumSer.show_notes().then(result => {
      that.notes = result;
      // console.log(result);
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(this.reg)) {
            result[i].content = ((result[i].content).match(this.reg)[0]);
          }
        }
        for (let i = 0; i < 15; i++) {
          that.newphooto.push(result[i])
        }
        console.log(that.newphooto);
      }
    });
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    let len = this.newphooto.length;
    console.log(len);
    setTimeout(() => {
      for (var i = len; i < len + 1; i++) {
        if (i < this.notes.length) {
          this.newphooto.push(this.notes[i]); // 向末尾push数据
          infiniteScroll.complete();
        }
        else {
          infiniteScroll.enable(false)
        }
      }
    }, 500);
  }

  back() {
    this.viewCtrl.dismiss();
  }

  toyou(id) {
    // console.log(id);
    let model = this.ModalCtrl.create(ParticularsPage, {'id': id});
    model.present();
  }
}
