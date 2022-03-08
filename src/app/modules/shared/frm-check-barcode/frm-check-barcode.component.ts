import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ProductsService } from 'src/app/services/products.service';
import { LangService } from 'src/app/services/lang.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-frm-check-barcode',
  templateUrl: './frm-check-barcode.component.html',
  styleUrls: ['./frm-check-barcode.component.scss']
})
export class FrmCheckBarcodeComponent implements OnInit {

  loading: boolean = false
  returnUrl: string
  error: string = ''
  barcodeform: FormGroup
  //labels
  lbl_title:string=''
  lbl_barcode:string=''

  @ViewChild('barcodeGrid') barcodeGrid: GridComponent
  constructor(
    private formBuilder: FormBuilder,
     private productsService: ProductsService,
     private langService:LangService,
     private toastr :ToastrService
     ) { }
  products: object[] = []
  ngOnInit() {
    this.barcodeform = this.formBuilder.group({
      barcode: ['', Validators.required]
    })
    this.setLabels()

  }
  get f() { return this.barcodeform.controls }

  onKeydown(event) {
    console.log(event.target.value)
    this.loading = true
    try
    {
      this.productsService.getBarcodes(event.target.value).subscribe(data => {
        data.map(code => 
        {
          (this.barcodeGrid.dataSource as object[]).length = 0;
          const record = {
            codeproduct: code.Cod_Product,
            description: code.Description,
            unit: code.bcunit,
            quantity: code.bcunit
          };
          (this.barcodeGrid.dataSource as object[]).push(record)
          this.barcodeGrid.refresh()
        })
        this.loading = false
      })
    }catch(error)
    {
      this.loading =false
      this.toastr.error(error)
    }
  }
  setLabels() {
    this.langService.get("T360", 'Check Barcode').then(text => this.lbl_title = text)
    this.langService.get("T316", 'Barcode').then(text => this.lbl_barcode = text)
  }

}
