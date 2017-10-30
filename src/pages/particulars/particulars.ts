import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  ToastController,
  ActionSheetController
} from 'ionic-angular';
import {CommentPage} from "../comment/comment";
import {NotesService} from '../../services/notes.service';
import {GlobalPropertyService} from '../../services/global-property.service';
import {LikeCollectService} from '../../services/like-collect.service';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html',
  providers: [NotesService, GlobalPropertyService, LikeCollectService]
})
export class ParticularsPage {
  notes: any;
  notesId: any;
  url: any;
  qnUrl: any;
  notesImg: any;
  userId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public ModCtrl: ModalController,
              public NotServ: NotesService,
              public glo: GlobalPropertyService,
              public likeSer: LikeCollectService,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              private storage: Storage) {
    this.url = this.glo.serverUrl;


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
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    this.get_note(id);
    console.log(id);
    console.log('ionViewDidLoad ParticularsPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }

  tocomment(id) {
    let model = this.ModCtrl.create(CommentPage, {'id': id});
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
          if (result[0].comment == '' || result[0].comment == null) {
            result[0].comment = 0;
          }
          if (result[0].like == '' || result[0].like == null) {
            result[0].like = 0;
          }
          if (result[0].collect == '' || result[0].collect == null) {
            result[0].collect = 0;
          }
          that.notes = result[0];
        }
      })
    }
  }

  collect(id) {
    let notesID = {notesId: id, userId: this.userId, type: '1'};
    let that = this;
    that.likeSer.getNotesCollect(notesID, function (result) {
      if (result.length == 0) {
        that.likeSer.notesCollect(notesID, function (result) {
          console.log(result);
          if (result.stateCode == 'L001') { // 收藏成功
            let toast = that.toastCtrl.create({
              message: '收藏成功',
              duration: 2000,
            });
            toast.present(toast);
          }
        })
      }
    })
  }

}
