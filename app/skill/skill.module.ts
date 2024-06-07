import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillPageRoutingModule } from './skill-routing.module';

import { SkillPage } from './skill.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [SkillPage]
})
export class SkillPageModule {}
