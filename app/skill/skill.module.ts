import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillPageRoutingModule } from './skill-routing.module';

import { SkillPage } from './skill.page';
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
    SkillPageRoutingModule,
    IonicStorageModule.forRoot()
=======
    SkillPageRoutingModule
>>>>>>> origin/master
  ],
  declarations: [SkillPage]
})
export class SkillPageModule {}
