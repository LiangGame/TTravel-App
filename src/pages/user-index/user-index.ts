import {Component, Renderer2} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
// import {FileItem, FileUploader} from 'ng2-file-upload';

import {UpdataUserInfoPage} from '../updata-user-info/updata-user-info'

// 导入服务
import {PersonalCenterService} from '../../services/personal-center.service';
import {GlobalPropertyService} from '../../services/global-property.service';


/**
 * Generated class for the UserIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-index',
  templateUrl: 'user-index.html',
  providers: [PersonalCenterService, GlobalPropertyService],
})
export class UserIndexPage {
  url: string;
  qnUrl: string;
  user: any;
  pet: string = "游记";
  notes: any = [];
  _check: any = [];
  ischeck: any = [];
  nocheck: any = [];
  reg: any = /<[^>]+>/g;
  _img: any = /<img\s+.*?>/g;
  footPrint: any;
  collectNotes: any = [];
  userImg: any = [];
  Icon: any;
  _telephone: any;
// onsucess:any;
//   uploader: FileUploader = new FileUploader({
//     url: this.glo.serverUrl + "/users/upload",
//     method: "POST",
//     itemAlias: "uploadedfile",
  // })

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private storage: Storage,
              private glo: GlobalPropertyService,
              public renderer: Renderer2,
              public modalCtrl: ModalController,
              private personSer: PersonalCenterService) {
    // 服务器IP地址
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((result) => {
        if (result) {
          this.user = result[0];
          this.Icon = `<img src='${this.url}/uploads/${result[0].icon}' width="65" height="65">`;
          // console.log(result);
        } else {
          return;
        }
      }).then(() => {
        this.getUserNotes();
      });
    });


    console.log('ionViewDidLoad UserIndexPage');
  }

  // 返回
  back() {
    this.viewCtrl.dismiss();
  }

  // 获取该用户游记
  getUserNotes() {
    this.personSer.show_notes({userId: this.user.telephone}).then((result) => {
      // console.log('getUserNotes');
      // console.log(result);
      // this.notes = result;
      if (result) {
        let reg = this.reg;
        for (let i = 0; i < result.length; i++) {
          // console.log((result[i].content).match(that._img));
          if ((result[i].content).match(this._img)) {
            this.notes.push({coverimg: (result[i].content).match(this._img), notes: result[i]})
          } else {
            this.notes.push({coverimg: [`<img src="${this.url}/uploads/notesDefault.jpeg">`], notes: result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
          ;
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          ;
          if (result[i].collect == '' || result[i].collect == null) {
            result[i].collect = 0;
          }
          // console.log(i);
          // console.log(that.newNotes);

          if (this.notes[i].notes.check == '0') {
            this._check.push(this.notes[i]);
          } else if (this.notes[i].notes.check == '1') {
            this.ischeck.push(this.notes[i]);
          } else {
            this.nocheck.push(this.notes[i]);
          }
        }
        console.log(this._check);
        console.log(this.ischeck);
        console.log(this.nocheck);

      }
    })
  }

  // // 展开
  // check_toggle(event){
  //   let display = event.target.nextElementSibling.style.display;
  //   if(display === 'none'){
  //     event.target.nextElementSibling.style.display = 'block';
  //   }else{
  //     event.target.nextElementSibling.style.display = 'none';
  //   }
  // }


  // 获取足迹
  getFootPrint() {
    this.personSer.getAllFootPorint({userId: this.user.id}).then(result => {
      console.log(result);
      if (result) {
        for (let i = 0; i < result.length; i++) {
          result[i].url = (result[i].url).split(',')[0];
        }
      }
      this.footPrint = result;
    })
  }

  // 获取收藏
  getCollectNotes() {
    this.collectNotes = [];
    this.personSer.getUserCollect(this.user.id).then(result => {
      if (result) {
        let reg = this.reg;
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(this._img)) {
            this.collectNotes.push({coverimg: (result[i].content).match(this._img), notes: result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
          ;
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
        }
        console.log(this.collectNotes);
      }
    })
  }

  // 获取用户照片

  getUserImages() {
    this.personSer.getUserImages({userId: this.user.id}).then(result => {
      // this.userImg = result;
      if (result) {
        for (let i = 0; i < result.length; i++) {
          this.userImg[i] = `
<img src="${this.url}/userImgs/${result[i].url}" alt="" class="pull-left" >`;
        }
      }
      console.log(this.userImg);

    })
  }

  // 跳转修改信息
  updata() {
    let modal = this.modalCtrl.create(UpdataUserInfoPage);
    modal.present();
  }

  // 上传头像
  // _upload() {
  //
  //   let that = this;
  //
  //   that.uploader.onBuildItemForm = that.buildItemForm;
  //   // that.uploader.queue[0].upload(); // 开始上传
  //   // that.Icon = `<img src='http://localhost:8889/uploads/${tempRes.icon}' width="100" height="100">`;
  //   that.uploader.queue[0].onSuccess = (response, status, headers) => {
  //
  //     // 上传文件成功
  //     if (status == 200) {
  //       that.uploader.clearQueue();
  //       // alert('上传文件成功')
  //       // 上传文件后获取服务器返回的数据
  //       let tempRes = JSON.parse(response);
  //       // console.log(tempRes);
  //       if (tempRes.affectedRows == 1) {
  //         that.Icon = `<img src='${that.url}/uploads/${tempRes.icon}' width="65" height="65">`;
  //       }
  //       // console.log(that.Icon);
  //     } else {
  //       // 上传文件后获取服务器返回的数据错误
  //     }
  //   };
  //
  // }
  //
  // buildItemForm(fileItem: any, form: any): any {
  //   let that = this;
  //   if (!fileItem["realFileName"]) {
  //     that._telephone = that.user.telephone;
  //     console.log("上传之前");
  //     console.log(fileItem);
  //     form.append("telephone", that._telephone);
  //   }
  // }
}
