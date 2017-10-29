import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {CommentPage} from "../comment/comment";
import {NotesService}from '../../services/notes.service';
import {GlobalPropertyService} from '../../services/global-property.service'
@IonicPage()
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html',
  providers:[NotesService,GlobalPropertyService]
})
export class ParticularsPage {
  notes: any;
  iconUrl: any;
  userIcon: any;
  notesId: any;
  comments: any;
  commentText: string = '';
  noLogin: boolean = false;
  commentInfo: string;
  credits: number;
  topInfoError: any;
  url: any;
  qnUrl: any;
  notesUrl: string;

  _title:any;_source:any;_sourceUrl:any;_showcount:any;_desc:any;
  _summary:any = '@-时光游-';
  _site:any;
  _width:any = 600;
  _height = 600;
  _top = (screen.height-this._height)/2;
  _left = (screen.width-this._width)/2;
  _url:any;
  notesImg: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public ModCtrl: ModalController,
              public NotServ:NotesService,
              public glo:GlobalPropertyService,

              ) {
    this.url=this.glo.serverUrl
  }

  ionViewDidLoad() {
    let id=this.navParams.get('id');
    this.get_note(id);
    // console.log(id);
    console.log('ionViewDidLoad ParticularsPage');
  }
back(){
  this.viewCtrl.dismiss();
}
  tocomment(id){
    // console.log(id);
    let model=this.ModCtrl.create(CommentPage,{'id':id});
  // ,'content':content
    model.present();
  }
  get_note(id) {
      this.notesId = {notesId: id};
      if (id) {
        let that = this;
        id = {"id": id};
        that.NotServ.getnotesItem(id, function (result) {
          if (result) {
            console.log(result);
            result[0].content = (result[0].content).replace(/&nbsp;/ig, '');
            if ((result[0].content).match(/<img\s+.*?>/g)) {
              that.notesImg = [];
              for (let i of ((result[0].content).match(/<img\s+.*?>/g))) {
                that.notesImg.push(i.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]);
              }
            }

            that.notes = result[0];
          }

        })

      }

  }

}
