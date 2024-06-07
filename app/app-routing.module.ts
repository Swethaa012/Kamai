import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  
 
  {
    path: 'instructions',
    loadChildren: () => import('./instructions/instructions.module').then( m => m.InstructionsPageModule)
  },
 
  
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'education',
    loadChildren: () => import('./education/education.module').then( m => m.EducationPageModule)
  },
  {
    path: 'skill',
    loadChildren: () => import('./skill/skill.module').then( m => m.SkillPageModule)
  },
  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module').then( m => m.ExtraPageModule)
  },
  
  
 
  
  
 
 
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
