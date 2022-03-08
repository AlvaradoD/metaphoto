import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { Element } from '../interfaces/element.interface';
import { InitStock } from '../interfaces/init-stock.interface';

@Injectable({
  providedIn: 'root'
})
export class InitStockService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  validateProduct(barcode: string): Observable<boolean> {
    let url = `InitStock/VerifyInitProduct`
    let params = new HttpParams()
      .set('theproductId', barcode)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: boolean = false
        if (res.success)
          result = res.related_data as boolean
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }

  getProductData(barcode: string): Observable<string> {
    let url = `InitStock/getConsultedProduct/`
    let params = new HttpParams()
      .set('theproductId', barcode)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: string
        if (res.success)
          result = res.related_data as string
        return result
      }),
      catchError(this.baseService.handleError)
    )

  }

  getLotNumberList(barcode: string): Observable<Element[]> {
    let url = `InitStock/GetLotnumbers`
    let params = new HttpParams()
      .set('theproduct', barcode)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: Element[]
        if (res.success)
          data = res.related_data as Element[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getNextLicensePlate(): Observable<number> {
    let url = `createPalletLicensePlate`
    return this.http.get<BcgResult>(url).pipe(
      map(res => {
        let license: number = 0
        if (res.success)
          license = res.related_data as number
        return license
      }),
      catchError(this.baseService.handleError)
    )
  }

  getUnitList(): Observable<Element[]> {
    let url = `InitStock/GetMeasureUnits`
    return this.http.get<BcgResult>(url).pipe(
      map(res => {
        let data: Element[]
        if (res.success)
          data = res.related_data as Element[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  verifyLocation(location: string, licensePlate: string): Observable<BcgResult> {
    let url = `InitStock/verifyLocation`
    let params = new HttpParams()
      .set('lcoation', location)
      .set('licensePlate', licensePlate)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  updateInitialLocation(product: InitStock): Observable<BcgResult> {
    let url = `InitStock/UpdateInitialLocation`
    return this.http.post<BcgResult>(url, product).pipe(
      catchError(this.baseService.handleError)
    )
  }

  verifyTargetLocation(locationTarget: string): Observable<boolean> {
    let url = `InitStock/VerifyTargetLocation`
    let params = new HttpParams()
      .set('thelocation', locationTarget)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let valid: boolean = false
        if (res.success)
          valid = res.related_data
        return valid
      }),
      catchError(this.baseService.handleError)
    )
  }

  verifyLocationTargetAvailability(locationTarget: string): Observable<any> {
    let url = `InitStock/VerifyAvailability`
    let params = new HttpParams()
      .set('thelocation', locationTarget)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(result => {
        if (result.success) {
          if (result.related_data == true) {
            return result.data
          } else
            return false
        }
      }),
      catchError(this.baseService.handleError)
    )
  }

}
