import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module'



import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
