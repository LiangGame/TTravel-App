import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdataUserInfoPage } from './updata-user-info';

@NgModule({
  declarations: [
    UpdataUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdataUserInfoPage),
  ],
})
export class UpdataUserInfoPageModule {}
