import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnsRoutingModule } from './returns-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ReturnsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReturnsModule { }
