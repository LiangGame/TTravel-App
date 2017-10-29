import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ModalController} from 'ionic-angular';
// , ModalController
import {IndexService} from '../../services/index.service';
import {GlobalPropertyService} from "../../services/global-property.service";
import {SearchPage} from '../search/search';
// import {StrategyPage} from '../strategy/strategy';
// import {ScenicPage} from '../scenic/scenic';

declare var AMap: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IndexService, GlobalPropertyService]
})
export class HomePage {
  @ViewChild(Slides) mySlides: Slides;
  _notes: any = [];
  user: any;
  reg: any = /<img\s+.*?>/g;
  url: any;
  qnUrl: any;
  cityinfo: any;
  city;

  constructor(public navCtrl: NavController,
              public ModalCtrl: ModalController,
              public indexSer: IndexService,
              public glo: GlobalPropertyService) {
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
    this.getCity();

  }

  ionViewDidLoad() {
    this.getNotes();
  }

  // toraiders(){
  //   let modal = this.modalCtrl.create(StrategyPage);
  //   modal.present();
  // }
  // todestination(){
  //   let modal = this.modalCtrl.create(ScenicPage);
  //   modal.present();
  // }

  slideChanged() {
    let activeIndex = this.mySlides.getActiveIndex();
    console.log(activeIndex);
    this.mySlides.startAutoplay();
  }

  toliebiao() {
    let model = this.ModalCtrl.create(SearchPage);
    model.present();
  }

  getCity(): Promise<any> {
    // 高德地图ip定位
    let that = this;
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    return new Promise((resolve) => {
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            that.cityinfo = result.city;  // 当前城市
            // var citybounds = result.bounds;
          }
          // resolve();
        }
      })
    })
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
