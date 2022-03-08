import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SyncfusionModule } from './syncfusion/syncfusion.module';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';

import { ToastrModule } from 'ngx-toastr';
import { FrmCheckBarcodeComponent } from './frm-check-barcode/frm-check-barcode.component';
import { FrmUpdateBarcodeComponent } from './frm-update-barcode/frm-update-barcode.component';
import { FrmProductsListComponent } from './frm-products-list/frm-products-list.component';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    FrmCheckBarcodeComponent, 
    FrmUpdateBarcodeComponent, 
    FrmProductsListComponent, 
    TranslatePipe,
  ],
  imports: [
    CommonModule,
    SyncfusionModule,
    NgxBootstrapModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }),
    SweetAlert2Module.forRoot({  })
  ],
  providers: [],
  exports: [
    SyncfusionModule,
    NgxBootstrapModule,
    NgxSpinnerModule,
    FrmCheckBarcodeComponent,
    FrmUpdateBarcodeComponent,
    FrmProductsListComponent,
    ToastrModule,
    TranslatePipe,
    SweetAlert2Module
  ]
})
export class SharedModule { }
