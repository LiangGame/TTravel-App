import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFootPrintPage } from './user-foot-print';

@NgModule({
  declarations: [
    UserFootPrintPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFootPrintPage),
  ],
})
export class UserFootPrintPageModule {}
