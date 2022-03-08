import { Component, OnInit, ViewChild, Renderer2, Injectable, RendererFactory2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, RowSelectEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { LangService } from 'src/app/services/lang.service';
import { InitStockService } from 'src/app/services/init-stock.service';
import { ToastrService } from 'ngx-toastr';
import { Element } from 'src/app/interfaces/element.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { InitStock } from 'src/app/interfaces/init-stock.interface';
import { environment } from '../../../../environments/environment';
import { LocationsService } from 'src/app/services/locations.service';
import { StorageService } from '../../../services/storage.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { albumsJSONVM, fotosJSONVM, photosJSONVM } from 'src/app/interfaces/ewms-user';



@Component({
  selector: 'app-inventory-init',
  templateUrl: './inventory-init.component.html',
  styleUrls: ['./inventory-init.component.scss']
})



export class InventoryInitComponent implements OnInit {

//tab
@ViewChild('staticTabs') staticsTabs: TabsetComponent

//search
public data: object[];
public toolbarOptions: ToolbarItems[];


 //prueba
  cbox: boolean;
  @ViewChild('addDevice', {static: false}) divDevice: ElementRef;

  loadingData: boolean = false
  unitList: { [key: string]: Object }[] = []
  cmbUnitFields: Object = { text: 'text', value: 'id' }

  lotNumberList: Element[] = []
  cmbLotNumberFields: Object = { text: 'description', value: 'code' }

  inventory: object[] = []
  @ViewChild('inventoryGrid') inventoryGrid: GridComponent
  invProduct: object[] = []
  @ViewChild('productGrid') productGrid: GridComponent

  locationForm: FormGroup

  newSerialForm: FormGroup


 //differences tab

  differencesPageTitle: string
  @ViewChild('differenceGrid') differenceGrid: GridComponent
  differenceGridDS: object[] = []





  error: string = ''

  tabsHeaderText: Object = [
    { 'text': 'Location' },
    { 'text': 'Inv By Location' },
    { 'text': 'Inv By Product' }
  ];

  lblUserName: string
  lblUserId: string
  lblUserUserName: string
  lblUserNoPhotos: string
  lblUserNoAlbums: string

  lblTitle: string
  lblProduct: string
  lblProductDescription: string
  lblLotNumber: string
  lblUnit: string
  lblQuantity: string
  lblGridTitle: string
  lblLocation: string
  lblPallet: string
  btnSaveText: string
  btnResetText: string
  lblRemainingQuantity: string
  btnCreatePallet: boolean = false
  requiredField: string = ''

  maxIDphoto: Number = 0;

  AlbumSelectId: string = "";
  AlbumSelectName: string = "";

  getalbums: Array<albumsJSONVM>
  getphotos:Array<photosJSONVM>

  get serialForm() {  return this.newSerialForm.controls }

  constructor(
    private formBuilder: FormBuilder,
    private langService: LangService,
    private renderer: Renderer2,
    private initStockService: InitStockService,
    private toastr: ToastrService,
    private productService: ProductsService,
    private authService: AuthService,
    private locationsService: LocationsService,
    private globals: StorageService,
    private location: Location,
    private spinner: NgxSpinnerService,

   
  ) { }

  ngOnInit() {




   
    this.toolbarOptions = ['Search'];

    this.AlbumSelectName = "";
    this.AlbumSelectId = "";

    //preuba
    this.cbox = true;
    sessionStorage.setItem('azar', '1');

    this.locationForm = this.formBuilder.group({
      
       product: [{ value: '', disabled: this.loadingData }, Validators.required]
      
     })


     this.newSerialForm = this.formBuilder.group({
      barcodeForSerial: [''],
      serieValue: [''],
    })


    this.setLabels()
    
    //Get albums
     this.getalbums = JSON.parse(localStorage.getItem("UserAlbums")) as Array<albumsJSONVM>
    console.log(this.getalbums);
  
    //Get Photos
    this.getphotos = JSON.parse(localStorage.getItem("UserPhotos")) as Array<photosJSONVM>
    console.log(this.getphotos);

 

    this.lblUserName = localStorage.getItem('UserName');
    this.lblUserUserName = localStorage.getItem('UserUsername');
    this.lblUserNoAlbums = localStorage.getItem('UserNoAlbums');
    this.lblUserNoPhotos = localStorage.getItem('UserNoPhotos');
    this.lblUserId = localStorage.getItem('UserId');


    this.GetRangePhotos(10);


  
        
 


        setTimeout(() => this.fillGrids(), 500);

 



  }

  
  dataBoundDiff() {
    this.differenceGrid.autoFitColumns([]);
  }


  fillGrids(){
      //diferencia 
      var data =  this.getalbums as albumsJSONVM[];
      (this.differenceGrid.dataSource as object[]).length = 0;
      if (data.length > 0) {
      (this.differenceGrid.dataSource as object[]) = data;         
      }
      this.differenceGrid.refresh();
  }




   rowSelected(args: RowSelectEventArgs) 
   {
     console.log('rowSelected',args)
     let ee : albumsJSONVM
     ee = args.data as albumsJSONVM
     if(ee){
      
      this.maxIDphoto = 0;
      this.renderer.setProperty(this.divDevice.nativeElement, 'innerHTML', "");


      this.AlbumSelectName = ee.id + ": " + ee.title;
      this.AlbumSelectId = ee.id;

      let serial =  this.serialForm.serieValue.value
      this.GetRangePhotos(serial);
     
        this.selectTab(1)
       // this.proF.codProductText.setValue(ee.productcode)

      
    } 
 }

  selectTab(tabId: number) {
   this.staticsTabs.tabs[tabId].active = true;
 }

  GetRangePhotos(cantidad:Number){
    this.spinner.show()
    
  

   var num = 0;
     for (let foto of this.getphotos){   

     
        if (this.AlbumSelectId=="0"){  

            if (num<cantidad  && this.maxIDphoto <  Number(foto.id) ){ 
              if(num+1 >= cantidad){
                this.maxIDphoto = Number(foto.id);
              }              
              num = num+1;
              setTimeout(() => this.AddPhoto(foto.id,foto.title,foto.thumbnailUrl,foto.albumId), 10);
            }
         
        }else{

            if (num<cantidad  && this.maxIDphoto <  Number(foto.id) && foto.albumId == this.AlbumSelectId ){ 
              if(num+1 >= cantidad){
                this.maxIDphoto = Number(foto.id);
              }              
              num = num+1;
              setTimeout(() => this.AddPhoto(foto.id,foto.title,foto.thumbnailUrl,foto.albumId), 10);
            }

        }
       
       
     }
     this.spinner.hide()
  }


  AddPhoto(fotoid:string ,fotonombre:string, fotourl:string, fotoalbum:string){

    //console.log("entro create");
    //console.log(this.divDevice.nativeElement)

    const div: HTMLDivElement = this.renderer.createElement('div');
    div.className ="col-md-4 col-sm-6"
    

    const div2: HTMLDivElement = this.renderer.createElement('div');
    div2.className="box1"
    div2.innerHTML =  '<img src="' + fotourl + '" alt="" style="height: 228px;">'
    div.appendChild(div2);


    // const h30: HTMLDivElement = this.renderer.createElement('h3');
    // h30.className="title2"
    // h30.innerHTML = "Album: " + fotoalbum;
    // div2.appendChild(h30);

    const h31: HTMLDivElement = this.renderer.createElement('h3');
    h31.className="title"
    h31.innerHTML = "Album: " + fotoalbum + "   Id: " + fotoid + " - " +fotonombre;
    div2.appendChild(h31);

   
    this.renderer.appendChild(this.divDevice.nativeElement, div);
 
  }


  cleardiv(){


    this.maxIDphoto = 0;
    this.renderer.setProperty(this.divDevice.nativeElement, 'innerHTML', "");

  }


  get f() { return this.locationForm.controls }

  onSubmit() {
    this.initStockService.verifyLocation(this.f.location.value.trim(), this.f.pallet.value.trim()).subscribe(
      result => {
        if (!result.success) {
          if (result.error_code == "FOUND") {
            let confirmtext: string
            this.langService.get('T726', 'The pallet was found on the specified location, are you sure you want to add the specified product?').then(text => confirmtext = text)
            let confirmation = confirm(confirmtext)
            if (confirmation == true) {
              // print pallet label with product
            }
          } else {
            this.toastr.info(result.message)
          }
        }
      }
    )

    const record: InitStock = {
      locationIdTarget: this.f.location.value.trim(),
      productId: this.f.product.value.trim(),
      lotNumber: this.f.lotNumber.value.trim(),
      qty: this.f.qty.value.trim(),
      unit: this.f.unit.value.trim(),
      palletId: this.f.pallet.value.trim(),
      companyId: this.globals.getLocalStorageValue("publicCodCompany"),
      userId: this.authService.getUserId()
    }

    this.initStockService.updateInitialLocation(record).subscribe(
      result => {
        if (result.success) {
          this.toastr.success(result.message)
          this.locationForm.reset()
        } else {
          this.langService.get('E206', 'An error ocurred while updating moved product').then(errorMsg => {
            this.toastr.error(errorMsg, 'Error')
          })
        }
      }
    )
  }






  createPalletLicensePlate() {

    this.spinner.show()
    this.loadingData = true
    this.initStockService.getNextLicensePlate().subscribe(
      data => {

        this.spinner.hide()
        this.loadingData = false
        this.f.pallet.setValue(data)
      }
    )
  }

  onProductSelected(event) {

    this.spinner.show()
    this.loadingData = true
    this.initStockService.validateProduct(this.f.product.value.trim()).subscribe(
      data => {
        if (data) {
          let productBarcode = this.f.product.value.trim()
          // fill the lotNumber combo
          this.initStockService.getLotNumberList(productBarcode).subscribe(
            data => {
              this.lotNumberList = data.map(function (lm) { return { code: lm.code, description: lm.description } })
              this.renderer.selectRootElement('#lotNumber').focus()

              this.spinner.hide()
              this.loadingData = false
            }
          )
          // get product description
          this.initStockService.getProductData(productBarcode).subscribe(
            data => this.lblProductDescription = data
          )
          // get product stock
          this.productService.getInventoryByProduct(this.authService.getUserId(), this.f.product.value.trim()).subscribe(
            data => {
              (this.productGrid.dataSource as object[]).length = 0;
              if (data.length > 0)
                (this.productGrid.dataSource as object[]).push(data);
              this.productGrid.refresh();
            }
          )
        } else {
          this.langService.get("E207", 'Invalid Product').then(msg => {
            this.toastr.error("Error", msg)
          })

          this.locationForm.reset()
          this.renderer.selectRootElement('#product').focus()


          this.spinner.hide()
          this.loadingData = false
        }
      }
    )
  }

  onLocationEntered() {

    this.spinner.show()
    this.loadingData = true
    this.initStockService.verifyTargetLocation(this.f.location.value.trim()).subscribe(
      result => {
        if (result) {
          this.initStockService.verifyLocationTargetAvailability(this.f.location.value.trim()).subscribe(
            data => {
              let result: boolean = false
              if (typeof data === 'string') result = true
              if (result) {
                this.f.qty.setValue('')
                this.f.pallet.setValue('')
                this.goToPallet(null)
              } else {
                this.f.pallet.setValue('')
                this.btnCreatePallet = true
              };
              this.locationsService.getStockInLocation(this.authService.getUserId(), this.f.location.value.trim()).subscribe(
                data => {
                  (this.inventoryGrid.dataSource as object[]).push(data);
                  this.inventoryGrid.refresh();
                }
              )
            })
        } else {
          this.langService.get('E35', 'Invalid location').then(errorMsg => this.toastr.error(errorMsg))
          this.f.location.setValue('')
          this.renderer.selectRootElement('#product').focus()
        }

        this.spinner.hide()
        this.loadingData = false
      }
    )
  }

  goToProduct(event) {
    this.renderer.selectRootElement('#product').focus()
  }

  goToPallet(event) {
    this.renderer.selectRootElement('#pallet').focus()
  }

  goToQuantity(event) {
    this.renderer.selectRootElement('#quantity').focus()
  }

  goToUnit(event) {
    this.renderer.selectRootElement('#unit').focus()
  }

  setLabels() {
    


    this.lblTitle = "Initial Inventory";
    this.lblProduct = "Number of photos to display each time you press see more";
    this.lblLotNumber = "Lot Number";
    this.lblUnit = "Unit";
    this.lblQuantity = "Qty";
    this.lblGridTitle = "Initial Inventory";
    this.lblLocation = "Location";
    this.lblPallet = "Pallet";
    this.btnSaveText = "Save";
    this.btnResetText  = "Reset";
    this.serialForm.serieValue.setValue('10');

  


  }

  backClicked() {
    this.location.back()
  }

  seemore() {
    console.log("ver mas");
    let serial =  this.serialForm.serieValue.value
    this.GetRangePhotos(serial);
    
  }





}
