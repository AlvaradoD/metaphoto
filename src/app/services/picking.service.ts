import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { PickingTask } from '../interfaces/picking-task.interface';
import { CheckedWaveProductsViewModel } from '../interfaces/checked-wave-products-view-model.interface';
import { DetailWaveProducts } from '../interfaces/detail-wave-products.interface';


@Injectable({
    providedIn: 'root'
})
export class PickingService {

    constructor(private http: HttpClient, private baseService: BaseService) { }

    getBatchesForCheck(
        waveId: string,
        codProduct: string): Observable<BcgResult> {

        let url = 'Picking/GetBatchesForCheck'
        let params = new HttpParams()
            .set('waveId', waveId)
            .set('codProduct', codProduct)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }


    getConversionFactor(
        codProduct: string,
        unitSource: string,
        unitTarget: string): Observable<BcgResult> {

        let url = 'Picking/getConversionFactor'
        let params = new HttpParams()
            .set('codProduct', codProduct)
            .set('unitSource', unitSource)
            .set('unitTarget', unitTarget)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    GetTotalAuditedTasks(theWave: string): Observable<BcgResult> {

        let url = 'Picking/GetTotalAuditedTasks'
        let params = new HttpParams()
            .set('theWave', theWave)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    GetAuditedInvDetail(theWave: string): Observable<BcgResult> {
        let url = 'Picking/getAuditedProducts'
        let params = new HttpParams()
            .set('theWave', theWave)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    GetWavePickingPickedProducts(wave_id: string): Observable<BcgResult> {
        let url = 'Picking/getWavePickingPickedProducts'
        let params = new HttpParams()
            .set('wave_id', wave_id)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    getCustomerDescription(customer_id: string): Observable<BcgResult> {

        let url = 'Picking/getCustomerDescription'
        let params = new HttpParams()
            .set('customer_id', customer_id)


        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    getTotalCheckTasks(
        location: string,
        wave: string): Observable<BcgResult> {

        let url = 'Picking/GetTotalCheckTasks'
        let params = new HttpParams()
            .set('location', location)
            .set('wave', wave)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }


    rejectQtyOnCheck(
        theCodproduct: string,
        theLotNumber: string,
        theQuantity: string,
        theUnit: string,
        theUser: string,
        theWave: string,
        theLocationtarget: string,
        theCompany: string,
        theSerialnumber: string
    ): Observable<BcgResult> {

        let url = 'Picking/RejectProductOnCheck'
        let params = new HttpParams()
            .set('codproduct', theCodproduct)
            .set('lotnumber', theLotNumber)
            .set('qty', theQuantity)
            .set('unit', theUnit)
            .set('user', theUser)
            .set('wave', theWave)
            .set('locationtarget', theLocationtarget)
            .set('company', theCompany)
            .set('serialnumber', theSerialnumber)


        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    checkPickingTask(
        theCodProduct: string,
        theLotNumber: string,
        theQuantity: string,
        theUnit: string,
        theUser: string,
        theWave: string,
        theLocationtarget: string,
        theCompany: string,
        theSerialnumber: string): Observable<BcgResult> {

        let url = 'Picking/CheckPickingTask'
        let params = new HttpParams()
            .set('theCodProduct', theCodProduct)
            .set('theLotNumber', theLotNumber)
            .set('theQuantity', theQuantity)
            .set('theUnit', theUnit)
            .set('theUser', theUser)
            .set('theWave', theWave)
            .set('theLocationtarget', theLocationtarget)
            .set('theCompany', theCompany)
            .set('theSerialnumber', theSerialnumber)


        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    getDetailWaveProducts(theWaveId: string, theLocation: string): Observable<DetailWaveProducts[]> {
        let url = `Picking/GetProductsDetailFromWave`
        let params = new HttpParams()
            .set('theWaveId', theWaveId)
            .set('theLocation', theLocation)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let data: DetailWaveProducts[] = []
                if (res.success) data = res.related_data as DetailWaveProducts[]
                return data
            }),
            catchError(this.baseService.handleError)
        )
    }

    GetProductsDetailFromWaveWithBatche(theWaveId: string): Observable<DetailWaveProducts[]> {
        let url = `Picking/GetProductsDetailFromWaveWithBatche`
        let params = new HttpParams()
            .set('theWaveId', theWaveId)
            
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let data: DetailWaveProducts[] = []
                if (res.success) data = res.related_data as DetailWaveProducts[]
                return data
            }),
            catchError(this.baseService.handleError)
        )
    }



    getCheckedWaveProducts(theWaveId: string, theLocation: string): Observable<CheckedWaveProductsViewModel[]> {
        let url = `Picking/GetCheckedWaveProducts`
        let params = new HttpParams()
            .set('theWaveId', theWaveId)
            .set('theLocation', theLocation)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let data: CheckedWaveProductsViewModel[] = []
                if (res.success) data = res.related_data as CheckedWaveProductsViewModel[]
                return data
            }),
            catchError(this.baseService.handleError)
        )
    }

    getDataForCheck(
        location: string): Observable<BcgResult> {

        let url = 'Picking/GetDataForCheck'
        let params = new HttpParams()
            .set('location', location)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    getFirstTaskIntelligent(
        theCodUser: string,
        theLastLocation: string,
        theLastDoc: string
    ): Observable<BcgResult> {

        let url = 'Picking/GetFirstTaskIntelligent'
        let params = new HttpParams()
            .set('theCodUser', theCodUser)
            .set('theLastLocation', theLastLocation)
            .set('theLastDoc', theLastDoc)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    getTaskData(task_number: number, theCodUser: string): Observable<BcgResult> {
        let url = `Picking/getTaskData`
        let params = new HttpParams()
            .set('task_number', task_number.toString())
            .set('theCodUser', theCodUser)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    updateTask(
        taskNumber: number,
        reason: string,
        user: string,
        codProduct: string,
        lotNumber: string,
        qty: number,
        unit: string,
        locationSource: string,
        locationTarget: string,
        ERPDocument: string,
        company: string,
        palletSource: string,
        codDC: string
    ): Observable<BcgResult> {
        let url = `Picking/updateTask`
        let task: any = {
            task_number: taskNumber,
            reason_id: reason,
            user_id: user,
            product_id: codProduct,
            batch_number: lotNumber,
            qty: qty,
            measure_unit: unit,
            location_source_id: locationSource,
            location_target_id: locationTarget,
            erp_document: ERPDocument,
            company_id: company,
            pallet_source: palletSource,
            lot_number: lotNumber,
            cod_DC: codDC
        }
        return this.http.post<BcgResult>(url, task).pipe(
            map(res => {
                return res
            }),
            catchError(this.baseService.handleError)
        )
    }

    updateTaskByPallet(
        taskNumber: number,
        reason: string,
        user: string,
        codProduct: string,
        lotNumber: string,
        qty: number,
        unit: string,
        locationSource: string,
        locationTarget: string,
        ERPDocument: string,
        company: string,
        palletSource: string,
        codDC: string
    ): Observable<BcgResult> {
        let url = `Picking/updateTaskByPallet`
        let task: any = {
            task_number: taskNumber,
            reason_id: reason,
            user_id: user,
            product_id: codProduct,
            batch_number: lotNumber,
            qty: qty,
            measure_unit: unit,
            location_source_id: locationSource,
            location_target_id: locationTarget,
            erp_document: ERPDocument,
            company_id: company,
            pallet_source: palletSource,
            lot_number: lotNumber,
            cod_DC: codDC
        }
        return this.http.post<BcgResult>(url, task).pipe(
            map(res => {
                return res
            }),
            catchError(this.baseService.handleError)
        )
    }

    auditWaveCheck(
        theWave: string,
        theCodProduct: string,
        theLotNumber: string,
        theUnit: string,
        theQty: string,
        theCompany: string,
        theUser: string
    ): Observable<BcgResult> {
        let url = `Picking/auditWaveCheck`
        let params = new HttpParams()
            .set('theWave', theWave)
            .set('theCodProduct', theCodProduct)
            .set('theLotNumber', theLotNumber)
            .set('theUnit', theUnit)
            .set('theQty', theQty)
            .set('theCompany', theCompany)
            .set('theUser', theUser)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res
            })
        )
    }

    moreTasks(user: string, targetLocation: string, wave: string): Observable<boolean> {
        console.log('entro a moreTasks')
        let url = `Picking/moreTasks`
        let params = new HttpParams()
            .set('target_location', targetLocation)
            .set('wave', wave)
            .set('cod_user', user)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                return res.success
            })
        )
    }

    movePalletInTruck(taskNum: number, palletId: string, truckId: string, CodUser: string, locationSource: string, taskNumber: string): Observable<BcgResult> {

        let url = 'Picking/MovePalletInTruck'
        let params = new HttpParams()
            .set('theTasknum', taskNum.toString())
            .set('palletId', palletId)
            .set('truckId', truckId)
            .set('codUser', CodUser)
            .set('locationSource', locationSource)
            .set('theTasknumber', taskNumber)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                return res
            }),
            catchError(this.baseService.handleError)
        )
    }

    getPallets(truckId: string): Observable<BcgResult> {
        let url = `Picking/getPalletsInTruck`
        let params = new HttpParams()
            .set('truckId', truckId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError))
    }

    validatePallet(palletId: string, locationSource: string): Observable<BcgResult> {
        let url = 'Picking/validatePallet'
        let params = new HttpParams()
            .set('palletId', palletId)
            .set('locationSource', locationSource)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }


    skipPickingTask(taskNum: string) {
        let url = `Picking/skipPickingTask`
        let params = new HttpParams()
            .set('tasknum', taskNum)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError))
    }
    validatePalletToMove(palletId: string, locationSource: string, pickingTask: string, pickingProduct: string, pickQty: string, theWave: string): Observable<BcgResult> {
        let url = 'Picking/validatePalletToMove'
        let params = new HttpParams()
            .set('palletId', palletId)
            .set('locationSource', locationSource)
            .set('thetasknumber', pickingTask)
            .set('thepickingProduct', pickingProduct)
            .set('thepickQty', pickQty)
            .set('theWaveId', theWave)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }
    searchPickingTaskByPallet(palletId: string, user: string): Observable<number> {
        let url = 'Picking/GetNewTaskByPallet/'
        let params = new HttpParams()
            .set('thepalletId', palletId)
            .set('theCodUser', user)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let tasknumber: number = 0
                if (res.success) {
                    tasknumber = res.related_data as number
                    return tasknumber
                }
            }), catchError(this.baseService.handleError)
        )
    }
    getpendingQtyForPickingProduct(productId: string, waveId: string, truckId: string): Observable<number> {
        let url = 'Picking/getpendingQtyForPickingProduct/'
        let params = new HttpParams()
            .set('theProduct', productId)
            .set('theWaveId', waveId)
            .set('theTruckId', truckId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let pendingQty: number = 0
                if (res.success) {
                    pendingQty = res.related_data as number
                    return pendingQty
                }
            }), catchError(this.baseService.handleError)
        )
    }
    getRelatedTasks(waveId: string, productId: string): Observable<BcgResult> {
        let url = `Picking/getRelatedTasksForProduct`
        let params = new HttpParams()
            .set('waveId', waveId)
            .set('productId', productId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError))
    }
    getNextLocationSource(pickingTask: string, pickProduct: string, pickQty: string, locationsUsed: string, truckId: string) {
        let url = 'Picking/nextLocationSource'
        let params = new HttpParams()
            .set('pickingTask', pickingTask)
            .set('pickProduct', pickProduct)
            .set('pickQty', pickQty)
            .set('locationsUsed', locationsUsed)
            .set('truckId', truckId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }
}