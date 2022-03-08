import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'others', loadChildren: './modules/others/others.module#OthersModule' },
  // { path: 'receiving', loadChildren: './modules/receiving/receiving.module#ReceivingModule' },
  // { path: 'tasks',loadChildren:'./modules/tasks/tasks.module#TasksModule'},
  // { path: '', redirectTo: '/core', pathMatch: 'full' },
  {
    path: '',
    loadChildren: './modules/core/core.module#CoreModule'
  },
  {path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
