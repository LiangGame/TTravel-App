import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScenicPage } from './scenic';

@NgModule({
  declarations: [
    ScenicPage,
  ],
  imports: [
    IonicPageModule.forChild(ScenicPage),
  ],
})
export class ScenicPageModule {}
