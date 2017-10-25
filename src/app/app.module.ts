import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

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

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

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
    ParticularsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    ParticularsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
