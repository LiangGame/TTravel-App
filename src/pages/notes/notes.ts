import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides } from 'ionic-angular';
import {ParticularsPage} from "../particulars/particulars";
import {NotesService} from '../../services/notes.service';
import {Storage} from '@ionic/storage';

import {LikeCollectService} from '../../services/like-collect.service';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
  providers: [NotesService, LikeCollectService]
})
export class NotesPage {

  notes: any;
  reg: any = /<[^>]+>/g;
  allNotes: any = [];
  newNotes: any = [];
  _img: any = /<img\s+.*?>/g;
  _like: string;
  key: any;
  hotNotes: any = [];
  userId: string;


  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ModCtrl: ModalController,
              public NotServ: NotesService,
              public likeSer: LikeCollectService,
              private storage: Storage) {

  }

  ionViewDidLoad() {
    this.getNotes();
    this.getHotNotes();
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        console.log(result);
        if (result) {
          this.userId = result[0].id;
          console.log(this.userId);
        } else {
          return;
        }
      });
    });
    console.log('ionViewDidLoad NotesPage');
  }
  toparticulars(id) {

    // console.log(id);
    let model = this.ModCtrl.create(ParticularsPage,{'id':id});
    model.present();
  }
  getNotes() {
    let that = this;
    let num = {num: 100};
    that.newNotes = [];
    that.NotServ.getNotes(num, function (result) {
      if (result) {
        console.log(result);
        let reg = that.reg;
        that.allNotes = [];
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that._img)) {
            that.allNotes.push({coverimg: (result[i].content).match(that._img), notes: result[i]})
          }else {
            that.allNotes.push({coverimg: '/notesDefault.jpeg', notes: result[i]})
          }
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
        }
        for( let i=0;i<5;i++){
          that.newNotes.push(that.allNotes[i])
        }
        // that.notes = result;
        console.log(that.newNotes);
      } else {
        console.log('没获取到游记数据!');
      }
    });
  }
  getHotNotes() {
    let that = this;
    that.NotServ.getHotNotes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that._img)) {
            that.hotNotes.push({coverimg: (result[i].content).match(that._img), notes: result[i]})
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


//上拉加载
  doInfinite(infiniteScroll) {
    let len=this.newNotes.length;
    setTimeout(() => {
      for(var i=len;i<len+3;i++){
        if(i <this.allNotes.length){
          this.newNotes.push(this.allNotes[i] ); // 向末尾push数据
          infiniteScroll.complete();
        }
        else{
          infiniteScroll.enable(false)
        }
      }
      infiniteScroll.complete();
    }, 500);
  }
  //下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getNotes();

      refresher.complete();
    }, 2000);
  }

  like(id) {
    console.log(id);
    id = {notesId: id, userId: this.userId, type: 1};
    this.likeSer.getNotesLike(id).then(result => {
      console.log(result);
      if (result.length == 0) {
        this.likeSer.notesLike(id).then(result => {
          if (result.stateCode == 'L001') {
            this.getNotes();
          }
        })
      }
    })
  }
}
