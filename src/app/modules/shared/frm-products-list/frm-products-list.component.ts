import { Component, OnInit, Renderer2, ViewChild,Output,EventEmitter } from '@angular/core';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ProductsService } from 'src/app/services/products.service';
import { ProductSearch } from 'src/app/interfaces/product-search.interface';
import { Globals } from 'src/app/global-config';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/services/lang.service';
@Component({
  selector: 'app-frm-products-list',
  templateUrl: './frm-products-list.component.html',
  styleUrls: ['./frm-products-list.component.scss']
})
export class FrmProductsListComponent implements OnInit {
  loading: boolean = false
  returnUrl: string
  error: string = ''
  product: string=''
  last_product: string=''
  description: string = ''
  selected_prod: string = ''
  selected_desc_prod: string = ''
  selected_row_grid: ProductSearch
  //labels
  lbl_title:string=''
  lbl_product:string=''
  lbl_lastCode:string=''
  lbl_description:string=''

  @ViewChild('productsGrid2') productsGrid2: GridComponent
  constructor(
    private renderer: Renderer2,
    private productsService: ProductsService, 
    private globals: Globals, 
    private toastr: ToastrService, 
    private langService:LangService) { }
  products: object[] = []
  tabsHeaderText: Object = [{ 'text': 'Product' }, { 'text': 'Description' }];
  @Output() messageEvent = new EventEmitter<ProductSearch>();
  ngOnInit() {
    this.setLabels()
  }
  onKeydown_product(event) {
    this.GetProductList()
  }
  onKeydown_Oldproduct(event) {
    this.GetProductList()
  }
  onKeydown_Description(event) {
    this.GetProductList()
  }
  onClick_Cancel() {
    this.selected_prod = ''
    this.selected_desc_prod=''
  }
  GetProductList() {
    this.loading = true
    try
    {
      this.productsService.ProductSeach(this.product, this.last_product, this.description).subscribe(data => {
        data.map(code => {
          (this.productsGrid2.dataSource as object[]).length = 0;
          const record = {
            product: code.product,
            code_old: code.code_old,
            description: code.description
          };
          (this.productsGrid2.dataSource as object[]).push(record)
          this.productsGrid2.refresh()
          this.loading=false
        },
          error => {
            this.loading = false
          })
      })
    }catch(error)
    {
      this.loading=false
      this.toastr.error(error)
    }
   
  }
  rowSelected(args: RowSelectEventArgs) {
    console.log(args)
    try
    {
      if (args!=null) {
        let selected = args.data
        this.selected_row_grid = selected as ProductSearch
        if (this.selected_row_grid)
        {
          console.log("selected product: " , this.selected_row_grid.product)
          this.globals.publicReturnCode = this.selected_row_grid.product
          this.globals.publicReturnDesc = this.selected_row_grid.description
          this.toastr.success(this.globals.publicReturnCode +'- selected')
        }
      }
    }catch(error)
    {
      this.toastr.error(error)
    }
  }
  setLabels() {
    this.langService.get("T443", 'Product Search').then(text => this.lbl_title = text)
    this.langService.get("T444", 'Code').then(text => this.lbl_product = text)
    this.langService.get("T445", 'Last Code').then(text => this.lbl_lastCode = text)
    this.langService.get("T446", 'Description').then(text => this.lbl_description = text)
  }

}
