import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTING: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }
]

const rootRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  imports: [
    rootRouting
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
