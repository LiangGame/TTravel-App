import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {CityPage} from '../city/city';
import {PhotoPage} from '../photo/photo';
import {SearchPage} from '../search/search';
import {XiangqPage} from '../xiangq/xiangq';
import {ScenicService} from '../../services/scenic.service';
import {IndexService} from '../../services/index.service';
import {GlobalPropertyService} from '../../services/global-property.service'

declare let AMap: any;

@IonicPage()
@Component({
  selector: 'page-scenic',
  templateUrl: 'scenic.html',
  providers:[ScenicService,IndexService,GlobalPropertyService],
})
export class ScenicPage {
  city: any = [];
  cityinfo:any;
  personalinfo:any;

  _scenic: any = [];
  allscenic: any = [];
  user: any;
  qnUrl:any;
  //默认选中
  pet: string ="俯瞰城市";
  lei=['俯瞰城市','山水相依','古迹遗址'];
  nature = ['04.jpeg','05.jpeg','06.jpeg','07.jpeg'];
  darkness = ['01.jpeg','02.jpeg','03.jpeg','04.jpeg',];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ModalCtrl: ModalController,
              public scenicSer:ScenicService,
              public IndexSer:IndexService,
              public glo:GlobalPropertyService
  ) {
    this.qnUrl=this.glo.qiniuUrl
    this.getHotScenic();
    this. getCity();
    this.getScenic();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScenicPage');
  }
  getHotScenic() {
    let that = this;
    that.scenicSer.getHotScenic(function (result) {
      if (result) {
        for (let i = 0; i <4; i++) {
          if (result[i].type == 0) {
            that.city.push( result[i]);
          }
        }
        // console.log(that.city);
        // console.log(that.nature);
      }
    })
  }

  getCity(): Promise<any> {
    // 高德地图ip定位
    let that = this;
    let citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    return new Promise((resolve) => {
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            // that.pro.push(result)
            that.cityinfo = result.city;  // 当前城市
            that.personalinfo = result.province;  // 当前城市
            // var citybounds = result.bounds;
          }
          resolve();
        }
      })
    })
  }

  getScenic() {
    let that = this;
    that.IndexSer.show_scenic(function (result) {
      that.allscenic = result;
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].url == '' || result[i].url == null) {
            continue;
          } else {
            result[i].url = (result[i].url).split(',');
          }
        }
        for(let i=0;i<5;i++){
          that._scenic.push(result[i]);
        }
        console.log(that._scenic);
      } else {
        console.log("error")
      }
    })
  }
  tocity(){
    let model = this.ModalCtrl.create(CityPage);
    model.present();
  }
  tophoto(){
    let model = this.ModalCtrl.create(PhotoPage);
    model.present();
  }
  tosearch(){
    let model = this.ModalCtrl.create(SearchPage);
    model.present();
  }
  tuxiang(id){
    let model = this.ModalCtrl.create(XiangqPage,{'id': id});
    model.present()
  }

//上拉加载
  doInfinite(infiniteScroll){
    let len = this._scenic.length;
      setTimeout(() => {
        for (var i = len; i < len+1; i++) {
          if(i <this.allscenic.length){
            this._scenic.push( this.allscenic[i] ); // 向末尾push数据
            infiniteScroll.complete();
          }
          else{
            infiniteScroll.enable(false)
          }
        }

      }, 500);

  }
}
