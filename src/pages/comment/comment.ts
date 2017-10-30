import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,ToastController} from 'ionic-angular';
import {NotesService} from '../../services/notes.service';
import {UserService} from '../../services/user.service';
import {Storage} from '@ionic/storage';
import {GlobalPropertyService} from '../../services/global-property.service';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [NotesService, UserService]
})
export class CommentPage {
  notes: any;
  notesId: any;
  comments: any;
  credits: number;
  url: any;
  qnUrl: any;
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public NotesSer: NotesService,
              public UserSer: UserService,
              public toastCtrl: ToastController,
              public glo:GlobalPropertyService,
              private storage: Storage,) {
    this.url = this.glo.serverUrl;

    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
        } else {
          return;
        }
      });
    });
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    // let content=this.navParams.get('content');
    this.notesId = id;
    this.getNotesComment(id);
    console.log(id);
    console.log('ionViewDidLoad CommentPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }


  // 获取评论信息
  getNotesComment(id) {
    let that = this;
    id = {"notesId": id};
    that.NotesSer.getnotesComment(id, function (result) {
      if (result) {
        that.comments = result;
        // console.log('===================获取评论数据==================');
        console.log(result);
        // console.log('================================================');
      }
    })
  }

  delete(Id) {
    // console.log(Id);
    let commentId = {commentId: Id};
    let that = this;
    that.NotesSer.deleteComment(commentId, function (result) {
      // console.log(result);
      if (result) {
        if (result == 1) {
          that.getNotesComment(that.notesId);

        } else {
          // console.log('=====================================');
        }
      }
    })
  }

  getCredits(userId) {
    if (userId) {
      let that = this;
      that.UserSer.getCredits({telephone: userId}, function (result) {
        // console.log(result);
        if (result) {
          if (result != '' || result != null) {
            that.credits = +result[0].userlv;
            // console.log('==========获取数据成功---->>>getCredits=========');
            that.UserSer.addCredits({telephone: userId, creits: (+that.credits + 5)}, function (result) {
              if (result.affectedRows == 1) {
                // that.router.navigate(['/index']);
                console.log(result);
                // console.log('评论成功,时光+5');
              }
            });
          }
        }
      });
    }
  }


  // 游记评论
  notesComment(comment) {
    // console.log(commentForm);
    let userId = this.user.id
    let body = {comment:comment, notesId: this.notesId, userId: userId, type: 1};
    console.log(body);
    let that = this;
    that.NotesSer.notesComment(body, function (result) {
      console.log(result);
      if (result) {
        if(result.statsCode == 'C001'){
          that.getNotesComment(that.notesId);
          let toast = that.toastCtrl.create({
            message: '评论成功！时光+5',
            duration: 2000,
          });
          toast.present(toast);
        }
      }
    })
  }

}
