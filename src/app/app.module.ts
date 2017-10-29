import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';

import {AlbumPage} from '../pages/album/album';
import {NotesPage} from '../pages/notes/notes';
import {ScenicPage} from '../pages/scenic/scenic';
import {StrategyPage} from '../pages/strategy/strategy';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {PersonPage} from '../pages/person/person';
import {LoginPage} from '../pages/login/login';
import {RegistPage} from '../pages/regist/regist';
import {ParticularsPage} from '../pages/particulars/particulars';
import {SettingPage} from '../pages/setting/setting'
import {AboutPage} from '../pages/about/about';
import {UserIndexPage} from '../pages/user-index/user-index'
import {CityPage} from '../pages/city/city';
import {UserCollectPage} from '../pages/user-collect/user-collect';
import {UserNotesPage} from '../pages/user-notes/user-notes';
import {UserPhotoPage} from '../pages/user-photo/user-photo';
import {UserFootPrintPage} from '../pages/user-foot-print/user-foot-print';
import {UserLvPage} from '../pages/user-lv/user-lv';
import {PhotoPage} from '../pages/photo/photo';
import {SearchPage} from '../pages/search/search';
import {LiebiaoPage} from '../pages/liebiao/liebiao';
import {DetailPage} from '../pages/detail/detail';
import {CommentPage} from '../pages/comment/comment';
import {UpdataUserInfoPage} from '../pages/updata-user-info/updata-user-info'
import {XiangqPage} from '../pages/xiangq/xiangq';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// 导入服务
import {GlobalPropertyService} from '../services/global-property.service';
import {LocalStorage} from '../services/local-storage.service';

// 管道
import {LocaleDatePipe} from '../Pipes/locale-date.pipe';
import {ThemeStringPipe} from '../Pipes/theme-string.pipe';
import {IndexNotesPipe} from '../Pipes/index-notes.pipe';
import {SearchScenicPipe} from '../Pipes/search-scenic.pipe';
import {TopicStringPipe} from '../Pipes/topic-string.pipe';
import {SearchNotesPipe} from '../Pipes/search-notes.pipe';

@NgModule({
  declarations: [
    MyApp,
    AlbumPage,
    NotesPage,
    HomePage,
    TabsPage,
    PersonPage,
    ScenicPage,
    StrategyPage,
    LoginPage,
    RegistPage,
    ParticularsPage,
    SettingPage,
    AboutPage,
    UserCollectPage,
    UserIndexPage,
    CityPage,
    SearchScenicPipe,
    ThemeStringPipe,
    TopicStringPipe,
    SearchNotesPipe,
    CityPage,
    UserIndexPage,
    UserNotesPage,
    UserPhotoPage,
    UserFootPrintPage,
    UserLvPage,
    CommentPage,
    UpdataUserInfoPage,
    // 管道
    LocaleDatePipe,
    ThemeStringPipe,
    IndexNotesPipe,
    CityPage,
    PhotoPage,
    SearchPage,
    LiebiaoPage,
    XiangqPage,
    LiebiaoPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlbumPage,
    NotesPage,
    HomePage,
    TabsPage,
    PersonPage,
    ScenicPage,
    StrategyPage,
    LoginPage,
    RegistPage,
    ParticularsPage,
    SettingPage,
    AboutPage,
    UserIndexPage,
    CityPage,
    UserIndexPage,
    CityPage,
    UserCollectPage,
    UserNotesPage,
    UserPhotoPage,
    UserFootPrintPage,
    UserLvPage,
    CityPage,
    PhotoPage,
    SearchPage,
    LiebiaoPage,
    DetailPage,
    CommentPage,
    XiangqPage,
    LiebiaoPage,
    DetailPage,
    UpdataUserInfoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalPropertyService,
    LocalStorage,
  ],
})
export class AppModule {

}
