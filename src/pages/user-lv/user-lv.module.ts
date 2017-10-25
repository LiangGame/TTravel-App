import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLvPage } from './user-lv';

@NgModule({
  declarations: [
    UserLvPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLvPage),
  ],
})
export class UserLvPageModule {}
