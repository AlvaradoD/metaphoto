import { Injectable } from '@angular/core';
import { BaseService } from './base.service'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BcgResult } from '../interfaces/bcg-result.interface'
import { PalletProduct } from '../interfaces/pallet-product.interface'
import { LotNumberProduct } from '../interfaces/lot-number-product.interface'

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  getLocationCount(userId: string): Observable<string>{
    let url = `Counting/GetLocationCount`
    let params = new HttpParams()
      .set('user', userId)
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data : string
        if (res.success) data = res.data
        return data
      })
    )
  } 

  getProductCount(userId: string): Observable<string>{
    console.log("GetProductCount");

    let url = `Counting/GetProductCount`
    let params = new HttpParams()
      .set('user', userId)
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data : string
        if (res.success) data = res.data
        return data
      })
    )
  } 
  
  countLocation(
    userId: string, 
    count: number, 
    locationId: string, 
    productId: string, 
    qty: number, 
    unit: string, 
    lotNumber: string, 
    palletId: string): Observable<BcgResult>{
      let url = `Counting/CountLocation`
      let params = new HttpParams()
        .set('sUsuario', userId)
        .set('sNo_Conteo', count.toString())
        .set('sUbicacion', locationId)
        .set('sCod_Producto', productId)
        .set('sCantidad', qty.toString())
        .set('sUnit', unit)
        .set('sLotNumber', lotNumber)
        .set('sPalletId', palletId)
      
        return this.http.get<BcgResult>(url, {params: params}).pipe(
          catchError(this.baseService.handleError)
        )
  }


  countProduct(
    userId: string, 
    count: number, 
    locationId: string, 
    productId: string, 
    qty: number, 
    unit: string, 
    lotNumber: string, 
    palletId: string): Observable<BcgResult>{
      let url = `Counting/CountProduct`
      let params = new HttpParams()
        .set('sUsuario', userId)
        .set('sNo_Conteo', count.toString())
        .set('sUbicacion', locationId)
        .set('sCod_Producto', productId)
        .set('sCantidad', qty.toString())
        .set('sUnit', unit)
        .set('sLotNumber', lotNumber)
        .set('sPalletId', palletId)
      
        return this.http.get<BcgResult>(url, {params: params}).pipe(
          catchError(this.baseService.handleError)
        )
  }


  // countLocation(
  //   userId: string, 
  //   count: number, 
  //   locationId: string, 
  //   productId: string, 
  //   qty: number, 
  //   unit: string, 
  //   lotNumber: string, 
  //   palletId: string): Observable<boolean|string>{
  //     let url = `Counting/CountLocation`
  //     let params = new HttpParams()
  //       .set('sUsuario', userId)
  //       .set('sNo_Conteo', count.toString())
  //       .set('sUbicacion', locationId)
  //       .set('sCod_Producto', productId)
  //       .set('sCantidad', qty.toString())
  //       .set('sUnit', unit)
  //       .set('sLotNumber', lotNumber)
  //       .set('sPalletId', palletId)
      
  //     return this.http.get<BcgResult>(url, {params: params}).pipe(
  //       catchError(this.baseService.handleError),
  //       map(res => {
  //         if (res.success && (res.error_code == null || res.error_code == '')) return true
  //         return res.message
  //       })
  //     )
  // }

  getPalletProducts(palletId: string): Observable<boolean|Array<PalletProduct>>{
    let url = `Counting/getProductsOnLicenseplate`
    let params = new HttpParams().set('licenseplate', palletId)

    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        if (res.success){
          return res.related_data as PalletProduct[]
        }
        return res.success
      })
    )
  }

  getProductLotNumber(codProduct: string, licensePlate: string): Observable<LotNumberProduct[]|boolean>{
    let url = `Counting/getProductLotNumbers`
    let params = new HttpParams()
      .set('codProduct', codProduct)
      .set('license_plate', licensePlate)
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        if (res.success)
          return res.related_data as LotNumberProduct[]
        return false
      })
    )
  }

  getRestartLocation(count: number, location: string, codProduct: string, lotNumber: string): Observable<BcgResult>{
    let url = `Counting/RestartLocation`
    let params = new HttpParams()
      .set('sConteo', count.toString())
      .set('sUbicacion', location)
      .set('sCodProducto', codProduct)
      .set('sLote', lotNumber)
    
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError)
    )
  }

  finalizeLocation(userId: string, count: number, location: string): Observable<boolean|string>{
    console.log("finalizeLocation");
    let url = `Counting/FinaliceLocation`
    let params = new HttpParams()
      .set('sUsuario', userId)
      .set('sNo_Conteo', count.toString())
      .set('sUbicacion', location)
    
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res=> {
        if (res.success) return res.success
        return res.message
      })
    )
  }

  finalizeProduct(userId: string, count: number, product: string, location: string): Observable<boolean|string>{
    console.log("finalizeProduct");
    let url = `Counting/FinaliceProduct`
    let params = new HttpParams()
      .set('sUsuario', userId)
      .set('sNo_Conteo', count.toString())
      .set('sUbicacion', location)
      .set('sProducto', product)
    
    return this.http.get<BcgResult>(url, {params: params}).pipe(
      catchError(this.baseService.handleError),
      map(res=> {
        if (res.success) return res.success
        return res.message
      })
    )
  }



}
