import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';

import { MenuComponent } from './menu/menu.component';
import { CoreComponent } from './core/core.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, CoreComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.')
    }
  }
}
