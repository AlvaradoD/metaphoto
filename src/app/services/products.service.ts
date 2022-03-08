import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Barcodes } from '../interfaces/barcodes.interface';
import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { ProductDetail } from '../interfaces/product-detail.interface';
import { ProductSearch } from '../interfaces/product-search.interface';
import { ProductData } from '../interfaces/product-data.interface';
import { ProductInventory } from '../interfaces/product-inventory.interface';
import { VerifyProduct } from '../interfaces/verify-product.interface';
import { ProductInv } from '../interfaces/product-inv.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  getInventoryByProduct(userCode: string, productCode: string): Observable<ProductInventory[]> {
    let url = `Products/getInventoryByProduct/`
    let params = new HttpParams()
      .set('theproductid', productCode)
      .set('theuserid', userCode)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let products: ProductInventory[]
        if (res.success)
          products = res.related_data.map(item => {
            return {
              location: item.location,
              lotNumber: item.lotnumber,
              unit: item.unit,
              quantity: item.Quantity,
              packs: item.packs,
              expDate: item.expdate,
              company: item.company,
              productId: item.product_id,
              productText: item.product_text,
              locationId: item.location_id,
              licensePlate: item.licenseplate
            }
          })
        return products
      }),
      catchError(this.baseService.handleError)
    )
  }
  getBarcodes(barcode: string): Observable<ProductDetail[]> {
    let url = `Products/GetBarcodes`
    let params = new HttpParams()
      .set('barcode', barcode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let trans: ProductDetail[]
        if (res.success)
          // trans = res.related_data
          trans = res.related_data as ProductDetail[]
        return trans
      }),
      catchError(this.baseService.handleError)
    )
  }
  GetProductData(product: string): Observable<string> {
    let url = 'Products/GetProductData'
    let params = new HttpParams().set('productId', product)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: string
        if (res.success)
          result = res.data as string
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }
  GetBarcodesByCode(barcode: string): Observable<Barcodes[]> {
    let url = 'Products/GetBarcodesByCode'
    let params = new HttpParams().set('barcode', barcode)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: Barcodes[]
        if (res.success)
          result = res.related_data as Barcodes[]
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }
  UpdateProductBarcode(product: string, barcode: string, user: string, qty: string): Observable<boolean> {
    let url = 'Products/UpdateProductBarcode'
    let params = new HttpParams().set('productId', product).set('barcode', barcode).set('user', user).set('qty', qty)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        if (res.success)
          return true
        else
          return false
      }),
      catchError(this.baseService.handleError)
    )
  }
  DeleteBarcode(productId: string, barcode: string, user: string): Observable<boolean> {
    let url = 'Products/DeleteBarcode'
    let iresult: boolean = false
    let params = new HttpParams().set('productId', productId).set('barcode', barcode).set('user', user)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        if (res.success)
          return true
        else
          return false
      }),
      catchError(this.baseService.handleError)
    )
  }
  ProductSeach(ProductCode: string, OldProductCode: string, Description: string): Observable<ProductSearch[]> {
    let url = `Products/GetProductList_Bysearch`
    let params = new HttpParams()
      .set('ProductCode', ProductCode)
      .set('oldProductCode', OldProductCode)
      .set('Description', Description)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let trans: ProductSearch[]
        if (res.success)
          trans = res.related_data as ProductSearch[]
        return trans
      }),
      catchError(this.baseService.handleError)
    )
  }

  GetAllProductData(Company: string, ProductCode: string): Observable<ProductData> {
    let url = 'Products/GetAllProductData'
    let params = new HttpParams()
      .set('company', Company)
      .set('productCode', ProductCode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: ProductData
        if (res.success) {
          result = res.related_data as ProductData
          return result
        }
      }), catchError(this.baseService.handleError)
    )
  }

  ValidateBarcodeLocation(codProduct: string, lotNumber: string, location: string): Observable<boolean> {
    let url = 'Products/ValidateBarcodeLocation'
    let params = new HttpParams()
      .set('codProduct', codProduct)
      .set('lotNumber', lotNumber)
      .set('location', location)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        if (res.success)
          return true
        else
          return false
      }),
      catchError(this.baseService.handleError)
    )
  }


  processBarcode(barcode: string): Observable<VerifyProduct> {
    let url = 'Products/ProcessBarcode'
    let params = new HttpParams()
      .set('barcode', barcode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: VerifyProduct
        if (res.success) data = res.related_data as VerifyProduct
        return data
      })
    )
  }

  ProcessBarcodeCheck(barcode: string, waveID: string): Observable<VerifyProduct> {
    let url = 'Products/ProcessBarcodeCheck'
    let params = new HttpParams()
      .set('barcode', barcode)
      .set('waveID', waveID)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: VerifyProduct
        if (res.success) data = res.related_data as VerifyProduct
        return data
      })
    )
  }

  getProductInventory(userCode: string, productCode: string, productOwner: string): Observable<ProductInv[]> {


    let url = `Products/GetProductInventory/`
    let params = new HttpParams()
      .set('productcode', productCode)
      .set('user_id', userCode)
      .set('productowner', productOwner)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let products: ProductInv[]
        if (res.success)
          products = res.related_data.map(item => {
            return {



              location: item.location,
              lotnumber: item.lotnumber,
              unit: item.unit,
              Quantity: item.Quantity,
              packs: item.packs,
              expdate: item.expdate,
              company: item.company,
              product_id: item.product_id,
              product_text: item.product_text,
              location_id: item.location_id,
              licenseplate: item.licenseplate
            }
          })
        return products
      }),
      catchError(this.baseService.handleError)
    )
  }

  getProductOnPallet(licensePlate: string): Observable<ProductInv[]> {


    let url = `Products/getProductOnPallet/`
    let params = new HttpParams()
      .set('license_plate', licensePlate)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let products: ProductInv[]
        if (res.success)
          products = res.related_data.map(item => {
            return {
              location: item.location,
              lotnumber: item.lotnumber,
              unit: item.unit,
              Quantity: item.Quantity,
              packs: item.packs,
              expDate: item.expdate,
              company: item.company,
              product_id: item.product_id,
              product_text: item.product_text,
              location_id: item.location_id,
              licenseplate: item.licenseplate
            }
          })
        return products
      }),
      catchError(this.baseService.handleError)
    )
  }

}
