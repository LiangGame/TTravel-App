import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LocalStorage} from './local-storage.service';
import {Storage} from '@ionic/storage';

// declare var $:any;
import {GlobalPropertyService} from './global-property.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonalCenterService {
  url: string;
  token: string;
  // url:string='http://127.0.0.1:8889/personal-center';
  // url: string = 'http://10.40.4.21:8889/personal-center';

  constructor(private http: HttpClient,
              private ls: LocalStorage,
              private glo: GlobalPropertyService,
              private storage: Storage) {
    this.url = glo.serverUrl;

    this.storage.ready().then(() => {
      this.storage.get('token').then((result) => {
        if (result) {
          this.token = result;
          // console.log(result);
        } else {
          return;
        }
      })
    })
  }

  show_province(callback) {
    this.http.get(this.url + '/personal-center/provinces').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  show_citys(provincename, callback) {
    this.http.post(this.url + '/personal-center/citys', provincename).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getCity(cityId, callback) {
    let params = new HttpParams().set('cityId', cityId);
    this.http.get(this.url + '/personal-center/getCity', {params: params}).subscribe(
      function (result) {
        callback(result);
        // console.log(result);
        // console.log('>>>>>>getCity>>>service');
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  show_notes(userId): Promise<any> {
    console.log(this.token);
    let _head = new HttpHeaders({token: this.token});
    return this.http.post(this.url + '/personal-center/notes', userId, {headers: _head}).toPromise()
      .then(result => {
        return result;
      })
  }

  addNotes(body, callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    body.title = body.title.notesTitle;
    this.http.post(this.url + '/personal-center/addNotes', body, {headers: _head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getUserImages(userId):Promise<any> {
    let _head = new HttpHeaders({token: this.token});
    return this.http.post(this.url + '/personal-center/getUserImages', userId, {headers: _head})
      .toPromise().then(result => result);
  }

  addFootPorint(body, callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});

    this.http.post(this.url + '/personal-center/addFootPrint', body, {headers: _head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getAllFootPorint(userId): Promise<any> {
    let _head = new HttpHeaders({token: this.token});
    let id = {userId: userId};
    return this.http.post(this.url + '/personal-center/getAllFootPrint', id, {headers: _head})
      .toPromise().then(result => result);
  }

  getUserCollect(userId): Promise<any> {
    let _head = new HttpHeaders({token: this.token});
    let id = {userId: userId};
    return this.http.post(this.url + '/personal-center/getUserCollect', id, {headers: _head})
      .toPromise().then(result => result);
  }

}

