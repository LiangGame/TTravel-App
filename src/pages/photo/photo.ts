import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import {TravelAlbumService} from '../../services/travel-album.service';
@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers:[TravelAlbumService]
})
export class PhotoPage {
  notes: any;
  reg: any = /<img\s+.*?>/g;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public albumSer: TravelAlbumService,
  ) {


  }

  ionViewDidLoad() {
    //
    // that.albumSer.show_notes(function (result) {
    //   if (result) {
    //     for (let i = 0; i < result.length; i++) {
    //       if ((result[i].content).match(that.reg)) {
    //         result[i].content = ((result[i].content).match(that.reg)[0]);
    //       }
    //     }
    //     that.notes = result;
    //     // console.log(that.notes);
    //   }
    // })
    this.albumSer.show_notes().then(result => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(this.reg)) {
            result[i].content = ((result[i].content).match(this.reg)[0]);
          }
        }
        this.notes = result;
      }
    });



    console.log('ionViewDidLoad PhotoPage');
  }
  back() {
    this.viewCtrl.dismiss( );
  }

}
