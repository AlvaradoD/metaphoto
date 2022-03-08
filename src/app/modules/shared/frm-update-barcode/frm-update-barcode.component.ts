import { Component, OnInit, Renderer2, ViewChild, Optional} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDetail } from 'src/app/interfaces/product-detail.interface';
import { ProductSearch } from 'src/app/interfaces/product-search.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Globals } from 'src/app/global-config';
import { LangService } from 'src/app/services/lang.service';
@Component({
  selector: 'app-frm-update-barcode',
  templateUrl: './frm-update-barcode.component.html',
  styleUrls: ['./frm-update-barcode.component.scss']
})
export class FrmUpdateBarcodeComponent implements OnInit {
  loading: boolean = false
  isBC:boolean=false
  frm_show :string ='0'
  returnUrl: string
  error: string = ''
  //labels
  lbl_product :string=''
  lbl_title :string=''
  lbl_barcode:string=''
  lbl_CheckBarcode:string=''
  lbl_qty:string=''
  lbl_btn_accept:string=''
  lbl_btn_cancel:string=''
  lbl_btn_update:string=''
  lbl_btn_delete:string=''
  lbl_btn_clear:string=''
  lbl_btn_verify:string=''
  lbl_product_description: string = ''
  selected_row_grid: ProductDetail
  selected_message_variable: ProductSearch
  selected_row_BCgrid: ProductDetail
  updatebarcodeform: FormGroup
  @ViewChild('productsGrid') productsGrid: GridComponent
  @ViewChild('barcodesGrid') barcodesGrid: GridComponent
  
  products: object[] = []
  barcodes: object[] = []
  tabsHeaderText: Object = [{ 'text': 'Products' }, { 'text': 'Codes' }];

  constructor(
    private formBuilder: FormBuilder, 
    private renderer: Renderer2, 
    private productsService: ProductsService,
    private toastr: ToastrService, 
    private globals: Globals,
    private authService:AuthService,
    private langService:LangService) { }

  ngOnInit() {
    this.updatebarcodeform = this.formBuilder.group({
      iproduct: ['', Validators.required],
      barcode: ['', Validators.required],
      iquantity: ['', Validators.required]
      
    })
    this.setLabels()
  }
  get f() { return this.updatebarcodeform.controls }
  onKeydown_product(event) {
    //get product label information
    this.loading = true
    try
    {
      this.productsService.GetProductData(this.f.iproduct.value).subscribe(data => {
        this.lbl_product_description = data;
        this.loading = false
        if (this.lbl_product_description) {
          this.renderer.selectRootElement('#barcode').focus();
          this.ShowBarcode(true)
        }
        else
          this.renderer.selectRootElement('#iproduct').focus();
        
      },
        error => {
          this.error = error
          this.lbl_product_description=this.error
          this.loading = false
          this.renderer.selectRootElement('#iproduct').focus();
        })
    }
    catch(error)
    {
      this.toastr.error(error)
    }
    
  }
  onKeydown_barcode(event) {
    this.ShowBarcode()
    this.renderer.selectRootElement('#iquantity').focus();
  }
  UpdateBarcode() {
    if (!this.f.iproduct.value){
      this.langService.get("E64", 'Invalid Product').then(text => this.toastr.error(text))
      return
    }
    if (!this.f.barcode.value) {
      this.langService.get("E56", 'Invalid Barcode').then(text => this.toastr.error(text))
      
      return
    }
    if (!this.f.iquantity.value) {
      this.langService.get("E8", 'Invalid Quantity').then(text => this.toastr.error(text))
      
      return
    }
    this.loading = true
    this.productsService.UpdateProductBarcode(this.f.iproduct.value, this.f.barcode.value,this.authService.getUserId(),this.f.quantity.value).subscribe(data => {
      this.loading = false
      if (data) {
        //updated
        this.langService.get("M32", 'Barcode updated.').then(text => this.toastr.success(text))
       
      }
      else {
       //error while updating
        this.langService.get('E707',"Error while updating product's barcode").then(text=>this.toastr.error(text))
       //this.toastr.error("Error while updating product's barcode")
      }
    },
      error => {
        this.error = error
        this.lbl_product_description = this.error
        this.loading = false
        this.renderer.selectRootElement('#iproduct').focus();
      })
  }
  DeleteBarcode() {

    if (!this.selected_row_BCgrid) {
      this.langService.get("E64", 'Invalid Product to delete').then(text => this.toastr.error(text))
      return
    }
    if(!this.f.barcode.value)
    {
      this.langService.get("E123", 'Invalid Barcode').then(text => this.toastr.error(text))
      return
    }
    this.loading = true
    this.productsService.DeleteBarcode(this.selected_row_BCgrid.Cod_Product,this.f.barcode.value,"").subscribe(data => {
      if (data) {
        this.langService.get("M34", 'Barcode deleted.').then(text => this.toastr.success(text))
      }
      else {
        this.langService.get('E706','An error ocurred while deleting barcode').then(text=>this.toastr.error(text))
        //this.toastr.error("An error has occurred while deleting barcode")
      }
      this.loading = false
    },
      error => {
        this.error = error
        this.lbl_product_description = this.error
        this.loading = false
        this.renderer.selectRootElement('#iproduct').focus();
      })
    this.ShowBarcode()
    this.ShowBarcode(true)
    this.renderer.selectRootElement('#barcode').focus();
  }
  Clear() {
    this.updatebarcodeform.reset()
    this.lbl_product_description=''
    this.renderer.selectRootElement('#iproduct').focus();
  }
  GetBarcodesByCode() {
    this.productsService.GetBarcodesByCode(this.f.iproduct.value).subscribe(data => {
      data.map(code => {
        const record = {
          barcode: code.barcode
        };
        if (this.barcodesGrid) {
          (this.barcodesGrid.dataSource as object[]).push(record)
          this.barcodesGrid.refresh()
        } else {
          console.log("grid barcodesgrid not found")
        }      })
    })
  }
  ShowBarcode(@Optional() byCode: boolean = false) {

    this.loading = true
    try
    {
      if (byCode) {
        this.barcodesGrid.dataSource = []
        this.productsService.GetBarcodesByCode(this.f.iproduct.value).subscribe(data => {
          data.map(code => {
            const record = {
              cod_product: code.cod_product,
              description: code.barcode
            };
            console.log(record)
            this.loading = false
            if (this.barcodesGrid) {
              (this.barcodesGrid.dataSource as object[]).push(record)
              this.barcodesGrid.refresh()
            } else {
              console.log("grid productsGrid not found")
            }
          },
            error => {
              this.loading = false
              console.log("error, grid productsGrid not found")
            })
        })
  
      }else
      {
        this.productsGrid.dataSource = [];
        this.productsService.getBarcodes(this.f.barcode.value).subscribe(data => 
        {
          data.map(code => {
            const record = {
              Cod_Product: code.Cod_Product,
              Description: code.Description,
              bcunit: code.bcunit,
              bcqty: code.bcqty
            };
            this.loading = false
            if (this.productsGrid) {
             
              (this.productsGrid.dataSource as object[]).push(record)
              this.productsGrid.refresh()
            } else {
              console.log("grid productsGrid not found")
            }
          },
            error => {
              this.loading = false
            })
        })
      }
    }catch(error)
    {
      this.toastr.error(error)
    }
  }
  onverifyBarcode() {
    this.frm_show='1'
  }
  onSearch() {
    this.frm_show = '2'
  }
  updateBarcode() {

    if (this.updatebarcodeform.invalid) return
    try
    {
      this.productsService.UpdateProductBarcode(this.f.iproduct.value, this.f.barcode.value,this.authService.getUserId(), this.f.iquantity.value).subscribe(data => {
        if (data) {
          this.langService.get('M32','Barcode successfully updated').then(text=>this.toastr.success(text))
        } else {
          this.langService.get('E218','An error occurred while updating barcode').then(text=>this.toastr.error(text))
        }
        this.ShowBarcode()
        this.ShowBarcode(true)
        this.renderer.selectRootElement('#barcode').focus();
      })
    }
    catch(error)
    {
      this.toastr.error(error)
    }
  }
  rowSelected(args: RowSelectEventArgs) {
    try
    {
      const selectedrecords: object[] = this.productsGrid.getSelectedRecords();
      if (selectedrecords) {
        let selected = selectedrecords[0]
        this.selected_row_grid = selected as ProductDetail
      }
    }
    catch(error)
    {
      this.toastr.error(error)
    }
  }
  rowBCSelected(args: RowSelectEventArgs) {
    try
    {
      if (args != null) {
        let selected = args.data
        this.selected_row_BCgrid = selected as ProductDetail
      }
    }catch(error)
    {
      this.toastr.error(error)
    }
  }
 
  verifySearchedProduct() {
    try
    { 
      if(this.globals.publicReturnCode.length > 0 && this.globals.publicReturnDesc.length > 0) {
        console.log("received", this.globals.publicReturnCode + "-" + this.globals.publicReturnDesc)
        //this.updatebarcodeform.setValue({ product: this.globals.publicReturnCode })
        this.updatebarcodeform.patchValue({ iproduct: this.globals.publicReturnCode })
        this.lbl_product_description = this.globals.publicReturnDesc
        this.loading=true
        setTimeout(() => {
          this.ShowBarcode(true)
          this.loading=false
        }, 500);
  
      }else {
        this.updatebarcodeform.patchValue({ iproduct: "" })
        this.lbl_product_description=""
      }

    }catch(error)
    {
      this.toastr.error(error)
    }
  }
  prevent(event){
    event.preventDefault();
   }
  return() {
    this.frm_show = '0'
    this.verifySearchedProduct()
  }
  setLabels() {
    this.langService.get("T464", 'Update Barcode').then(text => this.lbl_title = text)
    this.langService.get("T1", 'Product').then(text => this.lbl_product = text)
    this.langService.get("T466", 'BC:').then(text => this.lbl_barcode = text)
    this.langService.get("T360", 'Check Barcode').then(text => this.lbl_CheckBarcode= text)
    this.langService.get("T319", 'Quantity').then(text => this.lbl_qty= text)
    this.langService.get("T14", 'Accept').then(text => this.lbl_btn_accept= text)
    this.langService.get("T391", 'Update').then(text => this.lbl_btn_update= text)
    this.langService.get("T467", 'Delete').then(text => this.lbl_btn_delete= text)
    this.langService.get("T73", 'Clear').then(text => this.lbl_btn_clear= text)
    this.langService.get("T465", 'Verify').then(text => this.lbl_btn_verify= text)
  }
}
