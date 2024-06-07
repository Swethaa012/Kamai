import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RibbonPageRoutingModule } from './ribbon-routing.module';

import { RibbonPage } from './ribbon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RibbonPageRoutingModule
  ],
  declarations: [RibbonPage]
})
export class RibbonPageModule {}
