import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPhotoPage } from './user-photo';

@NgModule({
  declarations: [
    UserPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPhotoPage),
  ],
})
export class UserPhotoPageModule {}
