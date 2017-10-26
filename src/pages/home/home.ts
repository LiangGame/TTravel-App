import { Component,ViewChild } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';
import {IndexService} from '../../services/index.service';
import {GlobalPropertyService} from "../../services/global-property.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IndexService,GlobalPropertyService]
})
export class HomePage {
  @ViewChild(Slides) mySlides: Slides;
  _notes: any = [];
  user: any;
  reg: any = /<img\s+.*?>/g;
  url:any;
  qnUrl:any;
  constructor(public navCtrl: NavController,
  public indexSer:IndexService,
  public glo:GlobalPropertyService) {
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
  }

  ionViewDidLoad() {
    this.getNotes();
  }
  slideChanged(){
    let activeIndex=this.mySlides.getActiveIndex();
    console.log(activeIndex);
    this.mySlides.startAutoplay();
  }
  getNotes() {
    let that = this;
    that.indexSer.show_notes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that.reg)) {
            result[i].content = ((result[i].content).match(that.reg)[0]);
          }
        }
        that._notes = result;
        // that.newNotes = result[0];
        console.log(that._notes);
        // console.log();
      } else {
        console.log("error");
      }
    })
  };


}
