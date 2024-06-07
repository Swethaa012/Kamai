import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RibbonPage } from './ribbon.page';

const routes: Routes = [
  {
    path: '',
    component: RibbonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RibbonPageRoutingModule {}
