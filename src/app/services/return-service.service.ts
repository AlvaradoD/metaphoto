import { Injectable } from '@angular/core';
import { BaseService } from './base.service'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BcgResult } from '../interfaces/bcg-result.interface'
import { InvoiceTypes } from '../interfaces/invoice-types.interface'
import { LotNumberProduct } from '../interfaces/lot-number-product.interface'
import { ReturnInvoiceInfo } from '../interfaces/return-invoice-info.interface'

@Injectable({
  providedIn: 'root'
})
export class ReturnServiceService {

  constructor(private http: HttpClient, private baseService: BaseService) { }


  validateProductOnInvoice(stype: string,
                            sInvoice: string, 
                            sCodProduct: string, 
                            sQuantity: string, 
                            sUnit: string, 
                            sCompany: string, 
                            sTransactionType: string): Observable<BcgResult>{

    let url = `Returns/validateProductOnInvoice`
    let params = new HttpParams()
    .set('stype', stype)
    .set('sInvoice', sInvoice)
    .set('sCodProduct', sCodProduct)
    .set('sQuantity', sQuantity)
    .set('sUnit', sUnit)
    .set('sCompany', sCompany)
    .set('sTransactionType', sTransactionType)

    return this.http.get<BcgResult>(url, {params: params}).pipe(
    catchError(this.baseService.handleError)
    )
    }


  getInvoiceInfo(doc_type: string,
                   doc_num: string, 
                   company: string): Observable<BcgResult>{
    let url = `Returns/getInvoiceInfo`
    let params = new HttpParams()
    .set('doc_type', doc_type)
    .set('doc_num', doc_num)
    .set('company', company)
      return this.http.get<BcgResult>(url, {params: params}).pipe(
        catchError(this.baseService.handleError)
      )
  }

  getReturnReason(): Observable<BcgResult>{
    let url = `Returns/getReturnResason`
    let params = new HttpParams()
      return this.http.get<BcgResult>(url, {params: params}).pipe(
        catchError(this.baseService.handleError)
      )
}


  getInvoiceTypes(user: string): Observable<BcgResult>{
      let url = `Returns/getInvoiceTypes`
      let params = new HttpParams()
        .set('user', user)
        
      
        return this.http.get<BcgResult>(url, {params: params}).pipe(
          catchError(this.baseService.handleError)
        )
  }

}
