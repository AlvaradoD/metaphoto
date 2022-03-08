import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceivingRoutingModule } from './receiving-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
  ],

  imports: [    
    CommonModule,    
    SharedModule,
    ReactiveFormsModule,
    ReceivingRoutingModule,    
  ]
})
export class ReceivingModule { }
