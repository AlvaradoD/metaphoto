import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { ArrivalConsolidation } from '../interfaces/arrival-consoloditation.interface';
import { ArrivalConsolidationDetail } from '../interfaces/arrival-consolidation-detail.interface';
import { ArrivalDifference } from '../interfaces/arrival-difference.interface';
import { ArrivalLotNumber } from '../interfaces/arrival-lotnumber.interface';
import { PurchaseOrderDetail } from '../interfaces/purchase-order-detail.interface';
import { ArrivalPriority } from '../interfaces/arrival-priority.interface';
import { PalletLPDetail } from '../interfaces/pallet-lp-detail.interface';
import { ReceivingDetail } from '../interfaces/receiving-detail.interface';
import { ArrivalDetail } from '../interfaces/arrival-detail.interface';
import { ProductDoc } from '../interfaces/product-doc.interface';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {

  constructor(private http: HttpClient, private baseService: BaseService) { }


  arrivalReturnFromTransfer(sUser: string,
    sCod_Product: string,
    sLotNumber: string,
    sUnit: string,
    nQuantity: number,
    sLocationTarget: string,
    sWarehouseFrom: string,
    sCompany: string,
    sWarehouse: string,
    sDocument: string,
    sExpirationDate: string,
    sType: string,
    sAssignedTo: string,
    bBadState: number,
    sWarehouseName: string): Observable<BcgResult> {
    let url = `Arrivals/arrivalReturnFromTransfer`
    let params = new HttpParams()
      .set('sUser', sUser)
      .set('sCod_Product', sCod_Product)
      .set('sLotNumber', sLotNumber)
      .set('sUnit', sUnit)
      .set('nQuantity', nQuantity.toString())
      .set('sLocationTarget', sLocationTarget)
      .set('sWarehouseFrom', sWarehouseFrom)
      .set('sCompany', sCompany)
      .set('sWarehouse', sWarehouse)
      .set('sDocument', sDocument)
      .set('sExpirationDate', sExpirationDate)
      .set('sType', sType)
      .set('sAssignedTo', sAssignedTo)
      .set('bBadState', bBadState.toString())
      .set('sWarehouseName', sWarehouseName)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  arrivalByTransfer(sUser: string,
    sCod_Product: string,
    sLotNumber: string,
    sUnit: string,
    nQuantity: number,
    sLocationTarget: string,
    sWarehouseFrom: string,
    sCompany: string,
    sWarehouse: string,
    sDocument: string,
    sExpirationDate: string,
    sType: string,
    sAssignedTo: string,
    bBadState: number,
    sTransferDoc: string): Observable<BcgResult> {
    let url = `Arrivals/arrivalByTransfer`
    let params = new HttpParams()
      .set('sUser', sUser)
      .set('sCod_Product', sCod_Product)
      .set('sLotNumber', sLotNumber)
      .set('sUnit', sUnit)
      .set('nQuantity', nQuantity.toString())
      .set('sLocationTarget', sLocationTarget)
      .set('sWarehouseFrom', sWarehouseFrom)
      .set('sCompany', sCompany)
      .set('sWarehouse', sWarehouse)
      .set('sDocument', sDocument)
      .set('sExpirationDate', sExpirationDate)
      .set('sType', sType)
      .set('sAssignedTo', sAssignedTo)
      .set('bBadState', bBadState.toString())
      .set('sTransferDoc', sTransferDoc)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  IngresoPorCambioDeLote(
    cod_product: string,
    lot_number: string,
    unit: string,
    company: string,
    qty_to_transform: string,
    new_lot_number: string,
    location: string,
    user: string
  ): Observable<BcgResult> {
    let url = `Arrivals/IngresoPorCambioDeLote`
    let params = new HttpParams()
      .set('cod_product', cod_product)
      .set('lot_number', lot_number)
      .set('unit', unit)
      .set('company', company)
      .set('qty_to_transform', qty_to_transform)
      .set('new_lot_number', new_lot_number)
      .set('location', location)
      .set('user', user)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }


  getAvailableTransfers(cod_user: string): Observable<BcgResult> {
    let url = `Arrivals/getAvailableTransfers`
    let params = new HttpParams()
      .set('cod_user', cod_user)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  getSourceWarehouses(): Observable<BcgResult> {
    let url = `Arrivals/getSourceWarehouses`
    let params = new HttpParams()
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  getRestrictedLocationsByCat(cat: string): Observable<BcgResult> {
    let url = `Arrivals/getRestrictedLocationsByCat`
    let params = new HttpParams()
      .set('cat', cat)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }



  ArrivalCombo(sUser: string, sCod_Product: string, sLotNumber: string, nQuantity: string, sLocationTarget: string, sCompany: string, sUnit: string, sDateExpire: string, label_id: string): Observable<BcgResult> {
    let url = `Arrivals/ArrivalCombo`
    let params = new HttpParams()
      .set('sUser', sUser)
      .set('sCod_Product', sCod_Product)
      .set('sLotNumber', sLotNumber)
      .set('nQuantity', nQuantity)
      .set('sLocationTarget', sLocationTarget)
      .set('sCompany', sCompany)
      .set('sUnit', sUnit)
      .set('sDateExpire', sDateExpire)
      .set('label_id', label_id)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }


  ValidateProductCombos(sCod_Product: string, nQty: string, sUnit: string, barcode: string): Observable<BcgResult> 
  {
    let url = `Arrivals/ValidateProductCombos`
    let params = new HttpParams()
      .set('sCod_Product', sCod_Product)
      .set('nQty', nQty)
      .set('sUnit', sUnit)
      .set('barcode', barcode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }



  arrivalByReturnInvoice(user: string,
    codproduct: string,
    lotnumber: string,
    quantity: string,
    locationtarget: string,
    invoiceType: string,
    invoice: string,
    cod_customer: string,
    company: string,
    refDocument: string,
    unit: string,
    expirationDate: string,
    transactionType: string,
    reason: string,
    bBadState: string,
    assignTo: string,
    bCreateRequest: string): Observable<BcgResult> {

    let url = `Arrivals/ArrivalByReturnInvoice`
    let params = new HttpParams()
      .set('user', user)
      .set('codproduct', codproduct)
      .set('lotnumber', lotnumber)
      .set('quantity', quantity)
      .set('locationtarget', locationtarget)
      .set('invoiceType', invoiceType)
      .set('invoice', invoice)
      .set('cod_customer', cod_customer)
      .set('company', company)
      .set('refDocument', refDocument)
      .set('unit', unit)
      .set('expirationDate', expirationDate)
      .set('transactionType', transactionType)
      .set('reason', reason)
      .set('bBadState', bBadState)
      .set('assignTo', assignTo)
      .set('bCreateRequest', bCreateRequest)


    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )


  }

  getDocumentDetailByArrivalId(arrivalID: string): Observable<ProductDoc[]> {
    let url = `Arrivals/GetDocumentDetail_ByArrivalID`
    let params = new HttpParams()
      .set('arrivalId', arrivalID)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ProductDoc[] = []
        if (res.success) data = res.related_data as ProductDoc[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }


  getArrivalsRestrictionKey(): Observable<string> {
    let url = `Arrivals/getArrivalsRestrictionBy/`

    return this.http.get<BcgResult>(url).pipe(
      map(res => {
        let result: string
        if (res.success) result = res.related_data as string
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }

  getArrivalsProductDueDateIsRequired(): Observable<boolean> {
    let url = `Arrivals/getArrivalsProductDueDateIsRequired/`
    return this.http.get<BcgResult>(url).pipe(
      map(res => {
        let result: boolean = false
        if (res.success) result = res.related_data as boolean
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }

  getDocumentsByCediGate(cediId: string, location: string): Observable<ArrivalConsolidation[]> {
    let url = `Arrivals/Get_documentsByCediGate`
    let params = new HttpParams()
      .set('cedi', cediId)
      .set('location', location)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let arrival: ArrivalConsolidation[]
        if (res.success) arrival = res.related_data as ArrivalConsolidation[]
        return arrival
      }),
      catchError(this.baseService.handleError)
    )
  }

  getDetailReceived(arrivalId: string): Observable<BcgResult> {
    let url = `Arrivals/GetDetailReceived`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  ValidateLabeling(location: string): Observable<BcgResult> {
    let url = `Arrivals/ValidateLabeling`
    let params = new HttpParams()
      .set('location', location)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  updateUploaderDatetime(arrivalID: string, action: string): Observable<BcgResult> {
    let url = `Arrivals/updateUploaderDatetime`
    let params = new HttpParams()
      .set('arrivalid', arrivalID)
      .set('action', action)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  getDifferencesResume(arrivalId: string): Observable<ArrivalDifference[]> {
    let url = `Arrivals/GetDifferencesResume`
    let params = new HttpParams()
      .set('arrivalId', arrivalId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalDifference[] = []
        if (res.success)
          data = res.related_data as ArrivalDifference[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }


  removePurchaseOrderFromReceivingDoc(theArrivalId: string, theDocNumber: string): Observable<BcgResult> {
    let url = `Arrivals/removeDocFromArrivalMobile`
    let params = new HttpParams()
      .set('theArrivalId', theArrivalId)
      .set('theDocNumber', theDocNumber)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }


  addPurchaseOrderToReceivingDoc(arrivalId: string, arrivalType: string,
    doc: string, company: string): Observable<BcgResult> {
    let url = `Arrivals/AddDocToArrival`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)
      .set('typeid', arrivalType)
      .set('docs', doc)
      .set('company', company)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }

  editTagsDetail(tagdetail): Observable<BcgResult> {
    let url = `Arrivals/EditLpInfo`
    return this.http.post<BcgResult>(url, tagdetail).pipe(
      catchError(this.baseService.handleError)
    )
  }

  removeTagsDetail(tagdetail): Observable<BcgResult> {
    let url = `Arrivals/RemovetLpInfo`
    return this.http.post<BcgResult>(url, tagdetail).pipe(
      catchError(this.baseService.handleError)
    )
  }

  getTagsDetail(tagdetail): Observable<BcgResult> {
    let url = `Arrivals/getTagsDetail`
    return this.http.post<BcgResult>(url, tagdetail).pipe(
      catchError(this.baseService.handleError)
    )
  }

  // getPalletDetail(receivingId: string, pallet: string): Observable<BcgResult> {
  //   let url = `Arrivals/getArrivalInfoByLP`
  //   let params = new HttpParams()
  //     .set('palletId', pallet)
  //     .set('receivingId', receivingId)
  //   return this.http.get<BcgResult>(url, { params: params }).pipe(
  //     map(res => {
  //       if()
  //       let data: PalletLPDetail
  //       if (res.success) 
  //           data = res.related_data as PalletLPDetail
  //       return data
  //     }),
  //     catchError(this.baseService.handleError)
  //   ) 
  // }

  getPalletDetail(receivingId: string, pallet: string): Observable<BcgResult> {
    let url = `Arrivals/getArrivalInfoByLP`
    let params = new HttpParams()
      .set('palletId', pallet)
      .set('receivingId', receivingId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }


  getPurchaseOrderDetail(docNum: string, company: string): Observable<PurchaseOrderDetail[]> {
    let url = `Arrivals/GetConsolidateDetails`
    let params = new HttpParams()
      .set('docnum', docNum)
      .set('company', company)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: PurchaseOrderDetail[] = []
        if (res.success) data = res.related_data as PurchaseOrderDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getLocationDetail(location: string, dc: string): Observable<ReceivingDetail[]> {
    let url = `Arrivals/GetLocationDetail`
    dc = "TRAIL"
    let params = new HttpParams()
      .set('location', location)
      .set('dc', dc)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ReceivingDetail[] = []
        if (res.success) data = res.related_data as ReceivingDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getDocsFromArrivalMobile(arrivalId: string): Observable<ArrivalConsolidationDetail[]> {
    let url = `Arrivals/getDocsFromArrivalMobile`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalConsolidationDetail[] = []
        if (res.success) data = res.related_data as ArrivalConsolidationDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  saveConsolidationDoc(type: string, user: string, location: string,
    sreference: string, sDC: string, priority: string): Observable<string> {

    let url = `Arrivals/SaveConsolidation`
    let params = {
      arrival_type_id: type,
      user_id: user,
      location_id: location,
      reference: sreference,
      distribution_center_id: sDC,
      priority: priority
    }
    return this.http.post<BcgResult>(url, params).pipe(
      map(res => {
        let data: string
        if (res.success)
          data = res.related_data as string
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  saveConsolidationDetail(receivingDoc: string, detail: ReceivingDetail[]): Observable<boolean> {
    let url = `Arrivals/SaveConsolidationDetail`
    let params: any[] = []
    let lineNum: number = 0

    detail.map(d => {
      let item = {
        arrival_id: receivingDoc,
        doc_number: d.docnum,
        line_number: lineNum++,
        product_id: d.itemcode,
        unit: d.mainunit,
        qty_on_doc: d.qty,
        licenseplate: d.licenseplate,
        width: d.width,
        height: d.height,
        length: d.length,
        cases_x_pallet: d.cases_x_pallet,
        units_x_case: d.units_x_case
      }
      params.push(item)
    })

    return this.http.post<BcgResult>(url, params).pipe(
      map(res => {
        return res.success
      }),
      catchError(this.baseService.handleError)
    )
  }

  saveUnloadReceiving(arrivalID: string, detail: ArrivalConsolidationDetail[]): Observable<BcgResult> {
    let url = `Arrivals/saveUnloadReceiving`
    let params: any[] = []
    detail.map(d => {
      let item = {
        arrival_id: arrivalID,
        product_id: d.product_text,
        supplier_code: d.supplier_code,
        supplier_name: d.supplier_name,
        qty_unloaded: d.qty_unloaded,
        doc_number: d.doc_number,
        line_number: d.line_number
      }
      params.push(item)
    })

    return this.http.post<BcgResult>(url, params).pipe(
      catchError(this.baseService.handleError)
    )
  }

  getDocumentDetailReference(arrivalId: string): Observable<string> {
    let url = `Arrivals/GetDocumentsDetail_ref`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: string
        if (res.success)
          data = res.data
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getNewSequencePallet(productCode: string, arrivalId: string, userId: string): Observable<string> {
    let url = `Arrivals/getNewSequencePallet`
    let params = new HttpParams()
      .set('productCode', productCode)
      .set('arrivalId', arrivalId)
      .set('user_id', userId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: string
        if (res.success) data = res.related_data
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getProductLotNumbers(productCode: string, arrivalId: string): Observable<ArrivalLotNumber[]> {
    let url = `Arrivals/GetProductLotNumbers`
    let params = new HttpParams()
      .set('productCode', productCode)
      .set('arrivalId', arrivalId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalLotNumber[] = []
        if (res.success) data = res.related_data as ArrivalLotNumber[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getPalletProductRestriction(arrivalId: string, palletId: string, productCode: string): Observable<string> {
    let url = `Arrivals/getPalletProductByrestriction`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)
      .set('palletId', palletId)
      .set('product', productCode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let product: string
        if (res.success) product = res.related_data as string
        return product

      }),
      catchError(this.baseService.handleError)
    )
  }

  getPalletZone(arrivalId: string, palletId: string): Observable<string> {
    let url = `Arrivals/GetPalletZone`
    let params = new HttpParams()
      .set('arrivalId', arrivalId)
      .set('palletId', palletId)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: string
        if (res.success) data = res.data as string
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  closeArrival(codUser: string, arrivalId: string, assignToUser: string): Observable<BcgResult> {

    let url = `Arrivals/CloseArrival`
    let params = new HttpParams()
      .set('CodUser', codUser)
      .set('ArrivalId', arrivalId)
      .set('AssignToUser', assignToUser)


    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )

    // return this.http.get<BcgResult>(url, { params: params }).pipe(
    //   catchError(this.baseService.handleError),
    //   map(res => {
    //     if (!res.success) throw (res.message)
    //     return res.success
    //   }),
    //   catchError(this.baseService.handleError)
    // )
  }

  closePallet(userId: string, assignedTo: string, licencePlate: string, locationTarget: string, arrivalId: string): Observable<boolean> {
    let url = `Arrivals/ClosePallet`
    let params = new HttpParams()
      .set('CodUser', userId)
      .set('AssignedToUser', assignedTo)
      .set('LicensePlate', licencePlate)
      .set('LocationTarget', locationTarget)
      .set('ArrivalId', arrivalId)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        return res.success
      }),
      catchError(this.baseService.handleError)
    )
  }

  getPalletCat01Restriction(arrivalId: string, palletId: string): Observable<string> {
    let url = `Arrivals/getPalletCat01Byrestriction`
    let params = new HttpParams()
      .set('arrivalid', arrivalId)
      .set('palletid', palletId)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: string
        if (res.success)
          if (res.related_data != null)
            data = res.related_data
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  validateProductOnPurchase(purchaseId: string,
    codProduct: string,
    qty: number,
    company: string,
    unit: string): Observable<BcgResult> {
    let url = `Arrivals/validateProductOnPurchase`
    let params = new HttpParams()
      .set('PurchaseId', purchaseId)
      .set('CodProduct', codProduct)
      .set('Qty', qty.toString())
      .set('Company', company)
      .set('UOM', unit)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
    )
  }

  arrivalToWarehouse(
    codUser: string,
    codProduct: string,
    lotNumber: string,
    qty: number,
    licensePlate: string,
    status: string,
    locationTarget: string,
    ERPDocument: string,
    unit: string,
    transactionType: string,
    expirationDate: string,
    company: string,
    warehouse: string,
    comments: string,
    supplier: string
  ): Observable<BcgResult> {



    let url = `Arrivals/ArrivalToWarehouse`
    let params = new HttpParams()
      .set('theUser', codUser)
      .set('theCodProduct', codProduct)
      .set('theLotNumber', lotNumber)
      .set('theQuantity', qty.toString())
      .set('theLicensePlate', licensePlate)
      .set('theStatus', status)
      .set('theLocationTarget', locationTarget)
      .set('theERPDocument', ERPDocument)
      .set('theUnit', unit)
      .set('theTransactionType', transactionType)
      .set('theExpirationDate', expirationDate)
      .set('theCompany', company)
      .set('theWHCode', warehouse)
      .set('theComments', comments)
      .set('theSupplier', supplier)

    console.log("ArrivalToWarehouse prms", params)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }


  getPriorityDock(userId: string): Observable<ArrivalPriority> {
    let url = `Arrivals/getPriorityDock`
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalPriority
        if (res.success) {
          data = res.related_data as ArrivalPriority
        }
        return data
      }),
      catchError(this.baseService.handleError),
    )
  }
  getPriorityDockLoader(userId: string): Observable<ArrivalPriority> {
    let url = `Arrivals/getPriorityDockLoader`
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalPriority
        if (res.success) {
          data = res.related_data as ArrivalPriority
        }
        return data
      }),
      catchError(this.baseService.handleError),
    )
  }
  getCosolidationRecordsInDoc(arrivalId: string): Observable<ArrivalDifference[]> {
    let url = `Arrivals/GetDifferencesResume`
    let params = new HttpParams()
      .set('arrivalId', arrivalId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalDifference[] = []
        if (res.success)
          data = res.related_data as ArrivalDifference[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getArrivallist(user: string, offset: number): Observable<ArrivalConsolidation[]> {
    let url = `Arrivals/getArrivallist`
    let params = new HttpParams()
      .set('user', user)
      .set('timeoffset', offset.toString())
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalConsolidation[] = []
        if (res.success)
          data = res.related_data as ArrivalConsolidation[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getArrivalDetaillist(arrivalid: string): Observable<ArrivalConsolidationDetail[]> {
    let url = `Arrivals/getArrivalDetail`
    let params = new HttpParams()
      .set('arrivalID', arrivalid)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalConsolidationDetail[] = []
        if (res.success)
          data = res.related_data as ArrivalConsolidationDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getStagingUsage(arrivalid: string): Observable<ArrivalConsolidation[]> {
    let url = `Arrivals/getStagingUsage`
    let params = new HttpParams()
      .set('arrivalID', arrivalid)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalConsolidation[] = []
        if (res.success)
          data = res.related_data as ArrivalConsolidation[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getArrivalPalletReception(palletID: string): Observable<ArrivalDetail[]> {
    let url = `Arrivals/getArrivalPalletReception`
    let params = new HttpParams()
      .set('palletID', palletID)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalDetail[] = []
        if (res.success)
          data = res.related_data as ArrivalDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getArrivalPallets(arrivalID: string): Observable<ArrivalDetail[]> {
    let url = `Arrivals/getArrivalPallets`
    let params = new HttpParams()
      .set('arrivalID', arrivalID)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: ArrivalDetail[] = []
        if (res.success)
          data = res.related_data as ArrivalDetail[]
        return data
      }),
      catchError(this.baseService.handleError)
    )
  }

  getPendingReceiptPallet(arrivalID: string): Observable<number> {
    let url = `Arrivals/getPendingReceiptPallet`
    let params = new HttpParams()
      .set('arrivalID', arrivalID)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        if (res.success)
          return res.related_data as number
      }),
      catchError(this.baseService.handleError)
    )
  }
  GetProductInfo(barcode: string) {
    let url = `Products/ProcessBarcode`
    let params = new HttpParams()
      .set('barcode', barcode)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }
  arrivalByReturnFromWarehouse(
    sUser: string,
    sCod_Product: string,
    sLotNumber: string,
    sUnit: string,
    nQuantity: string,
    sLocationTarget: string,
    sWarehouseFrom: string,
    sCompany: string,
    sExpirationDate: string,
    sType: string,
    sAssignedTo: string,
    bBadState: string,

  ): Observable<BcgResult> {



    let url = `Arrivals/arrivalByReturnFromWarehouse`
    let params = new HttpParams()
      .set('user', sUser)
      .set('product', sCod_Product)
      .set('lotnum', sLotNumber)
      .set('unit', sUnit)
      .set('quantity', nQuantity)
      .set('locationTarget', sLocationTarget)
      .set('warehouse', sWarehouseFrom)
      .set('company', sCompany)      
      .set('type', sType)
      .set('userAssigned', sAssignedTo)
      .set('status', bBadState)


    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }
}
