import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';
import {ScenicPage} from '../scenic/scenic';
import {XiangqPage} from '../xiangq/xiangq';

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-liebiao',
  templateUrl: 'liebiao.html',
})
export class LiebiaoPage {
  yuyan=['景点概况:','城市很秀气，风景和人文感觉都很好。','知名旅游景点非常多，苏州园林则是最有名的景点。','山塘街夜景很美，很有特色，观前街很热闹小吃也多。','温婉的江南水乡是一座适合生活的安逸城市。']
items=[
  {postId:'001', icon_url:'assets/destination/icon.jpg',post:'拙政园',  address:'以水见长、自然典雅、庭院错落、花木为胜。始建于明代，与留园'},
  {postId:'002', icon_url:'assets/destination/icon.jpg',post:'拙政园',  address:'以水见长、自然典雅、庭院错落、花木为胜。始建于明代，与留园'},
  {postId:'003', icon_url:'assets/destination/icon.jpg',post:'拙政园',  address:'以水见长、自然典雅、庭院错落、花木为胜。始建于明代，与留园'},
  {postId:'004', icon_url:'assets/destination/icon.jpg',post:'拙政园',  address:'以水见长、自然典雅、庭院错落、花木为胜。始建于明代，与留园'},
  {postId:'005', icon_url:'assets/destination/icon.jpg',post:'拙政园',  address:'以水见长、自然典雅、庭院错落、花木为胜。始建于明代，与留园'}
]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public ModalCtrl: ModalController,) {
  }
  //下拉
  doRefresh(refresher) {

    setTimeout(() => {
      // console.log('努力加载中...');

      // <!--更新数据部分-->
      this.items.unshift({
        postId:'001',
        icon_url:'assets/destination/icon.jpg',
        post:'dffggdf',
        address:'dffrtytrgthhjtyhbdrsgergfsfsdfe'
      });
      refresher.complete();
    }, 500);
  }
  //上拉
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.items.push({
        postId:'003',
        icon_url:'assets/destination/icon.jpg',
        post:'ibm总经理',
        address:'苏州仁爱路3号'
      })
      infiniteScroll.complete();
    }, 500);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LiebiaoPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }
  toxiangq(){
      let model = this.ModalCtrl.create(XiangqPage);
      model.present();
  }
}
