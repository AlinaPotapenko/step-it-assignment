import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  declarations: [ MainComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MainModule { }
