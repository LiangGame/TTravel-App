import {Component, ViewChild,} from '@angular/core';
import {NavController, Slides,ModalController} from 'ionic-angular';
// , ModalController
import {IndexService} from '../../services/index.service';
import {GlobalPropertyService} from "../../services/global-property.service";
import {SearchPage} from '../search/search';
// import {StrategyPage} from '../strategy/strategy';
// import {ScenicPage} from '../scenic/scenic';
import {XiangqPage} from '../xiangq/xiangq';
import {ParticularsPage} from "../particulars/particulars";
import {NotesService} from '../../services/notes.service';

declare var AMap: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IndexService,NotesService, GlobalPropertyService]
})
export class HomePage {
  @ViewChild(Slides) mySlides: Slides;
  _notes: any = [];
  allNotes: any = [];
  _scenic:any = [];
  hotNotes: any = [];
  user: any;
  reg: any = /<img\s+.*?>/g;
  url: any;
  qnUrl: any;
  cityinfo: any;
  city;

  constructor(public navCtrl: NavController,
              public ModalCtrl: ModalController,
              public indexSer: IndexService,
              public ModCtrl: ModalController,
              public NotServ: NotesService,
              public glo: GlobalPropertyService) {
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
    this.getCity();

  }

  ionViewDidLoad() {
    this.getScenic();
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
  toliebiao(){
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
  getScenic() {
    let that = this;
    that.indexSer.show_scenic(function (result) {
      // console.log('成功')
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].url == '' || result[i].url == null) {
            continue;
          } else {
            result[i].url = (result[i].url).split(',');
          }
        }
        that._scenic = result;
        // console.log(that._scenic);
      } else {
        console.log("error")
      }
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
  getHotNotes() {
    let that = this;
    that.NotServ.getHotNotes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that.reg)) {
            that.hotNotes.push({coverimg: (result[i].content).match(that.reg), notes: result[i]})
          }
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
        }
        // that.hotNotes = result;
        // console.log('相关阅读');
        console.log(that.hotNotes);
      }
    })
  }

  tuxiang(id){
    let model = this.ModalCtrl.create(XiangqPage,{'id': id});
    model.present();
  }
  toparticulars(id){
    let model=this.ModCtrl.create(ParticularsPage,{'id': id});
    model.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getNotes();

      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    let len=this._notes.length;
    setTimeout(() => {
      for(var i=len;i<len+3;i++){
        if(i <this.allNotes.length){
          this._notes.push(this.allNotes[i] ); // 向末尾push数据
          infiniteScroll.complete();
        }
        else{
          infiniteScroll.enable(false)
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

}
