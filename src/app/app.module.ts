import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import {AlbumPage} from '../pages/album/album';
import {NotesPage} from '../pages/notes/notes';
import {ScenicPage} from '../pages/scenic/scenic';
import {StrategyPage} from '../pages/strategy/strategy';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {PersonPage} from '../pages/person/person';
import {LoginPage} from '../pages/login/login';
import {RegistPage} from '../pages/regist/regist';
import {SettingPage} from '../pages/setting/setting'
import {AboutPage} from '../pages/about/about';
import {UserIndexPage} from '../pages/user-index/user-index'
import {CityPage} from '../pages/city/city';
import {PhotoPage} from '../pages/photo/photo';
import {SearchPage} from '../pages/search/search';
import {LiebiaoPage} from '../pages/liebiao/liebiao';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// 导入服务
import {GlobalPropertyService} from '../services/global-property.service';
import {LocalStorage} from '../services/local-storage.service';

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
    SettingPage,
    AboutPage,
    UserIndexPage,
    CityPage,
    PhotoPage,
    SearchPage,
    LiebiaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
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
    SettingPage,
    AboutPage,
    UserIndexPage,
    CityPage,
    PhotoPage,
    SearchPage,
    LiebiaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalPropertyService,
    LocalStorage,
  ]
})
export class AppModule {
}
