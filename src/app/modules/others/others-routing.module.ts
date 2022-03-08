import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryInitComponent } from './inventory-init/inventory-init.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LocationInvComponent } from './location-inv/location-inv.component';


const routes: Routes = [
  {
    path: '',
    //component: OthersComponent,
    canActivate: [AuthGuard],
    children: [
     
      {
        path: 'inventory/init',
        component: InventoryInitComponent
      },
      {
        path: 'location/inv',
        component: LocationInvComponent
      },    
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
