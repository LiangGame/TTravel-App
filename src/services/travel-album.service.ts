import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service'

@Injectable()
export class TravelAlbumService {
  url:string;
  // url:string='http://127.0.0.1:8889/personal-center';
  // url: string = 'http://10.40.4.21:8889/index';

  constructor(private http: HttpClient,
              private glo: GlobalPropertyService) {
    this.url = glo.serverUrl;
  }


  show_notes(callback) {
    this.http.post(this.url + '/index/getNotes', {num:100}).subscribe(
      function (result) {
        if(result){
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  show_scenic(callback) {
    this.http.post(this.url + '/getScenic', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

}
