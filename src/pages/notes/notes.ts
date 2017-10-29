import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides } from 'ionic-angular';
import {ParticularsPage} from "../particulars/particulars";
import {NotesService}from '../../services/notes.service';



@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
  providers:[NotesService]
})
export class NotesPage {

  notes: any;
  reg: any = /<[^>]+>/g;
  newNotes: any = [];
  _img: any = /<img\s+.*?>/g;
  _like: string;
  key: any;
  hotNotes: any = [];

  datas=[

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
    },
  ];
  @ViewChild(Slides) slides: Slides;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ModCtrl: ModalController,
    public NotServ:NotesService
  ) {
  }

  ionViewDidLoad() {
   this. getNotes();
   this. getHotNotes();
    console.log('ionViewDidLoad NotesPage');
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //
  //   setTimeout(() => {
  //     this.datas.push(
  //       {
  //         title:'在路上',
  //         img:'05.jpeg',
  //         content:'jdkhflsfdiefsfsggdfggdjjhiljojiigdgdfgfdgdgdgdgfefifhu',
  //         authorName:'五',
  //       }
  //     )
  //     // infiniteScroll.complete();
  //   }, 500);
  // }

  toparticulars(id){
    // console.log(id);
    let model=this.ModCtrl.create(ParticularsPage,{'id':id});
    model.present();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  getNotes() {
    let that = this;
    let num = {num: 5};
    that.NotServ.getNotes(num, function (result) {
      if (result) {
        // console.log(result);
        let reg = that.reg;
        that.newNotes = [];
        for (let i = 0; i < result.length; i++) {
          if((result[i].content).match(that._img)){
            that.newNotes.push({coverimg:(result[i].content).match(that._img),notes:result[i]})
          }
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
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
          if((result[i].content).match(that._img)){
            that.hotNotes.push({coverimg:(result[i].content).match(that._img),notes:result[i]})
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
        // console.log(that.hotNotes);
      }
    })
  }

}
