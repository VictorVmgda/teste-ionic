import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MudaSenhaPage } from './muda-senha';

@NgModule({
  declarations: [
    MudaSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(MudaSenhaPage),
  ],
})
export class MudaSenhaPageModule {}
