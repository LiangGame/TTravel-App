import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service'
import {LocalStorage} from './local-storage.service';
import {Storage} from '@ionic/storage';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class LikeCollectService {
  url: string;
  token:string;

  constructor(private http: HttpClient,
              private ls: LocalStorage,
              private glo: GlobalPropertyService,
              private storage: Storage) {
    this.url = glo.serverUrl;
    this.storage.ready().then(() => {
      this.storage.get('token').then((result) => {
        if (result) {
          this.token = result;
          console.log(result);
        } else {
          return;
        }
      });
    })
  }

  // 游记点赞
  notesLike(id):Promise<any> {
    let _head = new HttpHeaders({token: this.token});

    // let _head = new HttpHeaders({token: this.ls.get('token')});
    return this.http.post(this.url + '/users/notesLike', id, {headers: _head})
      .toPromise().then(result => result);
  };

  // 获取游记点赞信息
  getNotesLike(id):Promise<any> {
    // let _head = new HttpHeaders({token: this.ls.get('token')});
    return this.http.post(this.url + '/users/getNotesLike', id).toPromise()
      .then(result => {
        return result;
        // console.log(result);
      })


      // .subscribe(
      // function (result) {
      //   if (result) {
      //     callback(result);
      //   }
      // },
      // function (error) {
      //   console.log(error.message);
      // }
    // );
  };

  //游记收藏
  notesCollect(id, callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/notesCollect', id, {headers: _head}).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  //获取游记收藏信息
  getNotesCollect(id, callback) {
    // let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/getNotesCollect', id).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };
}
