import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {NotesService}from '../../services/notes.service';
import {UserService}from '../../services/user.service';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers:[NotesService,UserService]
})
export class CommentPage {
  notes: any;
  notesId: any;
  comments: any;
  credits: number;
  url: any;
  qnUrl: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public NotesSer :NotesService,
    public UserSer :UserService,
    private storage: Storage,

  ) {

  }

  ionViewDidLoad() {
    let id=this.navParams.get('id');
    // let content=this.navParams.get('content');
    this.getNotesComment(id);
    console.log(id);
    console.log('ionViewDidLoad CommentPage');
  }
  back() {
    this.viewCtrl.dismiss();
  }


  // 游记评论
  notesComment(commentForm, notesId) {
    // console.log(commentForm);
    // id = {"notesId": id,comment:content,userId:userid,type:1};

    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let body = {comment: commentForm.value.comment, notesId: notesId, userId: userId, type: 1}
    let that = this;
    that.NotesSer.notesComment(body, function (result) {
      // console.log(result);
      if (result) {
        that.getCredits(JSON.parse(sessionStorage.getItem('user')).telephone);
      }
    })
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

}
