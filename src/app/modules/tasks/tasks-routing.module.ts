import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';




const routes: Routes = [
  {
    path: '',
    
    canActivate: [AuthGuard],
    children: [
     
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
    //gdg
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
