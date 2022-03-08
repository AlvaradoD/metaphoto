import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { CoreComponent } from './core/core.component';

import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: CoreComponent,
  canActivate: [AuthGuard],
  children: [
   {
     path: 'core',
     component: MenuComponent
   },
   {
     path: 'others',
     canActivateChild: [AuthGuard],
     loadChildren: '../others/others.module#OthersModule'
   },
   {
     path: 'receiving',
     canActivateChild: [AuthGuard],
     loadChildren: '../receiving/receiving.module#ReceivingModule'
   },
   {
     path: 'tasks',
     canActivateChild: [AuthGuard],
     loadChildren: '../tasks/tasks.module#TasksModule'
   },
   {
    path: 'returns',
    canActivateChild: [AuthGuard],
    loadChildren: '../returns/returns.module#ReturnsModule'
  },
  {
    path: 'consults',
    canActivateChild: [AuthGuard],
    loadChildren: '../others/others.module#OthersModule'
  },
   {
     path: '',
     redirectTo: 'core',
     pathMatch: 'full'
   }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
