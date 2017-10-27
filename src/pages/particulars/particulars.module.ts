import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsPage } from './particulars';

@NgModule({
  declarations: [
    ParticularsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsPage),
  ],
})
export class ParticularsPageModule {}
