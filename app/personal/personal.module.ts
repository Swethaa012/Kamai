import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';

import { PersonalPage } from './personal.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
