import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { LangService } from 'src/app/services/lang.service';
import { ToastrService } from 'ngx-toastr';
import { LocationsService } from 'src/app/services/locations.service';
import { StorageService } from '../../../services/storage.service';
import { StockInLocation } from 'src/app/interfaces/stock-in-location.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-location-inv',
  templateUrl: './location-inv.component.html',
  styleUrls: ['./location-inv.component.scss']
})
export class LocationInvComponent implements OnInit {

  loadingData: boolean = false

  lblTitle: string = ""
  lblLocation: string = ""
  lblLocationDescription: string = ""

  location: string = ""
  btnCopyText: string = ""
  selectedCodProduct: string = ""

  selectedRow: StockInLocation


  @ViewChild('detailGrid') gridData: GridComponent
  gridDataDs: object[] = []
  gridDataLabels: any = {
    codproduct: '',
    lotnumber: '',
    unit: '',
    quantity: '',
    licenseplate: '',
    packs: '',
    ExpDate: '',
    description: ''
  }

  constructor(
    private locationsService: LocationsService,
    private globals: StorageService,
    private toastrService: ToastrService,
    private langService: LangService,
    private authService: AuthService,
    private _location: Location,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.setLabels()
    this.goToField('location')
  }

  getInventoryKeyPress(event) {
    if (event.keyCode === 9 || event.keyCode === 13) {
      this.getInventory()
    }
  }

  getInventory() {
    try {
      this.locationsService.getLocationDescription(this.location).subscribe(
        data => {
          this.lblLocationDescription = data
        }
      )

      this.spinner.show()
      this.locationsService.getStockInLocation(this.authService.getUserId(), this.location).subscribe(
        data => {
          (this.gridData.dataSource as object[]).length = 0;
          this.spinner.hide()

          if (data.length > 0) {
            data.map(code => {
              const record = {
                codproduct: code.codproduct,
                lotnumber: code.lotnumber,
                unit: code.unit,
                quantity: code.quantity,
                licenseplate: code.licenseplate,
                packs: code.packs,
                ExpDate: code.expdate,
                description: code.description
              };
              (this.gridData.dataSource as object[]).push(record);

              setTimeout(() => {
                this.location = ''
                this.goToField('location')
              }, 500);

            });
          } else {
            setTimeout(() => {
              this.location = ''
              this.goToField('location')
            }, 500);
            this.langService.get("E702", "No data found").then(text => this.toastrService.error(text))
          }

          this.gridData.refresh();
          this.loadingData = false
        }
      )
    } catch (error) {
      console.log("err location_OnKeyPress", error)
    }
  }

  grid_OnRowSelected(args: RowSelectEventArgs) {
    if (args != null) {
      let selected = args.data;

      this.selectedRow = selected as StockInLocation
      this.selectedCodProduct = this.selectedRow.codproduct
    }
  }

  btnCopy_OnClick() {
    try {
      this.globals.setLocalStorageValue("publicSelectedProduct", this.selectedCodProduct)
    }
    catch (error) {
    }
  }

  setLabels() {

   
    this.lblTitle = "Inventory by Location";
    this.lblLocation  = "Location";
    this.btnCopyText = "Copy";

    this.gridDataLabels.codproduct = "Cod. Product";
    this.gridDataLabels.lotnumber = "Lot. Number";
    this.gridDataLabels.unit = "Unit";
    this.gridDataLabels.quantity= "Quantity";
    this.gridDataLabels.licenseplate= "Pallet";
    this.gridDataLabels.packs= "Packs";
    this.gridDataLabels.ExpDate= "Exp. Date";
    this.gridDataLabels.description= "Description";

  }

  backClicked() {
    this._location.back()
  }

  refreshPage() {
    this.location = ''
    this.gridDataDs = []
    this.gridData.refresh();
    this.goToField('location')
  }

  goToField(field: string) {
    this.renderer.selectRootElement(`#${field}`).focus()
  }
}
