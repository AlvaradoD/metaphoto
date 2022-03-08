import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OthersRoutingModule } from './others-routing.module';

import { InventoryInitComponent } from './inventory-init/inventory-init.component';

import { SharedModule } from '../shared/shared.module';
import { LocationInvComponent } from './location-inv/location-inv.component';

@NgModule({
  declarations: [
    InventoryInitComponent,
    LocationInvComponent,  
  ],
  imports: [
    CommonModule,
    OthersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OthersModule { }
