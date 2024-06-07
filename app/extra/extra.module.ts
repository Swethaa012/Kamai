import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraPageRoutingModule } from './extra-routing.module';

import { ExtraPage } from './extra.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtraPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [ExtraPage]
})
export class ExtraPageModule {}
