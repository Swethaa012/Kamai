import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraPageRoutingModule } from './extra-routing.module';

import { ExtraPage } from './extra.page';
<<<<<<< HEAD
import { IonicStorageModule } from '@ionic/storage-angular';
=======
>>>>>>> origin/master

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    ExtraPageRoutingModule,
    IonicStorageModule.forRoot()
=======
    ExtraPageRoutingModule
>>>>>>> origin/master
  ],
  declarations: [ExtraPage]
})
export class ExtraPageModule {}
