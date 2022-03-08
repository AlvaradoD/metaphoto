import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [],
  imports: [
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    ButtonsModule,
    TabsModule,
  ]
})
export class NgxBootstrapModule { }
