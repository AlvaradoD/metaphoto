import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, of, throwError, observable } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import {RelocationTaskData} from '../interfaces/relocation-task-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RelocationTasksService {

  constructor(private http:HttpClient,private baseService:BaseService) { }

  getFirstTask(user:string,sDC:string):Observable<BcgResult>{
    let url = `Relocation/GetFirstTask/`
    let params = new HttpParams()
    .set('codUser',user)
    //.set('sDC',sDC)
      return this.http.get<BcgResult>(url, { params: params }).pipe(
        map(res => {
          return res
        }),
        catchError(this.baseService.handleError)
      )
    }
  getTaskData(Tasknumber:string,CodUser:string,LiftTruck:string,LocationsUsed:string):Observable<RelocationTaskData>{
    let url='Relocation/GetTaskData'
    let params = new HttpParams()
    .set('Tasknumber',Tasknumber)
   //.set('CodUser',CodUser)
    //.set('LiftTruck',LiftTruck)
    //.set('LocationsUsed',LocationsUsed)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res =>{
        let result:RelocationTaskData
        if(res.success)
        {
          result = res.related_data as RelocationTaskData
          return result
        }
      }),catchError(this.baseService.handleError)
    )
  }
  updateTask(Tasknumber:string,reason:string,user:string,productCode:string,lotnumber:string,qty:number,locationSource:string,locationTarget:string,unit:string,company:string,sDC:string,palletId:string):Observable<BcgResult>
  {
    
    let url='Relocation/UpdateTask/'
    let params = new HttpParams()
    .set('nTaskNumber',Tasknumber)
    .set('sReason',reason)
    .set('sCodUser',user)
    .set('sCod_Product',productCode)
    .set('sLotNumber',lotnumber)
    .set('nQuantity',qty.toString())
    .set('sLocationSource',locationSource)
    .set('sLocationTarget',locationTarget)
    .set('sUnit',unit)
    .set('sCompany',company)
    .set('sDC',sDC)
    .set('sPallet_Id',palletId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        return res
      }),
      catchError(this.baseService.handleError)
    )
  }
  updateTaskByPallet(Tasknumber:string,reason:string,user:string,productCode:string,lotnumber:string,qty:number,locationSource:string,locationTarget:string,unit:string,company:string,arrivalDate:string,palletId:string):Observable<BcgResult>
  {
    let url='Relocation/GetUpdateTask_Xpallet/'
    let params = new HttpParams()
    .set('Tasknumber',Tasknumber)
    .set('reason',reason)
    .set('coduser',user)
    .set('productcode',productCode)
    .set('lotnumber',lotnumber)
    .set('qty',qty.toString())
    .set('locationsource',locationSource)
    .set('locationtarget',locationTarget)
    .set('unit',unit)
    .set('company',company)
    .set('arrivaldate',arrivalDate)
    .set('palletid',palletId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        return res
      }),
      catchError(this.baseService.handleError)
    )
  }
  searchRelocationTaskByPallet(palletId:string,user:string):Observable<number>
  {
    let url='Relocation/GetNewTaskByPallet/'
    let params = new HttpParams()
    .set('thepalletId',palletId)
    .set('theCodUser',user)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res=>
      {
        let tasknumber:number=0
        if(res.success)
        {
          tasknumber=+res.data          
        }
        return tasknumber
      }),catchError(this.baseService.handleError)
    )
  }

  RelocationToUnits(sReason:string,
    sCod_User:string,
    sCod_Product:string,
    sLotNumber:string,
    nQuantity:string,
    sLocationSource:string,
    sLocationTarget:string,
    sCompany:string,
    sUnit:string):Observable<BcgResult>
    {
    let url='Relocation/RelocationToUnits/'
    let params = new HttpParams()
    .set('sReason',sReason)
    .set('sCod_User',sCod_User)
    .set('sCod_Product',sCod_Product)
    .set('sLotNumber',sLotNumber)
    .set('nQuantity',nQuantity)
    .set('sLocationSource',sLocationSource)
    .set('sLocationTarget',sLocationTarget)
    .set('sCompany',sCompany)
    .set('sUnit',sUnit)

return this.http.get<BcgResult>(url, { params: params }).pipe(
map(res => {
return res
}),
catchError(this.baseService.handleError)
)
}
RelocationToBoxes(sReason:string,
  sCod_User:string,
  sCod_Product:string,
  sLotNumber:string,
  nQuantity:string,
  sLocationSource:string,
  sLocationTarget:string,
  sCompany:string,
  sUnit:string):Observable<BcgResult>
  {
  let url='Relocation/RelocationToBoxes/'
  let params = new HttpParams()
  .set('sReason',sReason)
  .set('sCod_User',sCod_User)
  .set('sCod_Product',sCod_Product)
  .set('sLotNumber',sLotNumber)
  .set('nQuantity',nQuantity)
  .set('sLocationSource',sLocationSource)
  .set('sLocationTarget',sLocationTarget)
  .set('sCompany',sCompany)
  .set('sUnit',sUnit)

return this.http.get<BcgResult>(url, { params: params }).pipe(
map(res => {
return res
}),
catchError(this.baseService.handleError)
)
}

  updateDiscretionalRelocation(sReason:string,
                              sCod_User:string,
                              sCod_Product:string,
                              sLotNumber:string,
                              nQuantity:string,
                              sLocationSource:string,
                              sLocationTarget:string,
                              sUnit:string,
                              sCompany:string,
                              licenseplate:string,
                              invoice:string):Observable<BcgResult>
  {
    let url='Relocation/DiscretionalRelocation/'
    let params = new HttpParams()
            .set('sReason',sReason)
            .set('sCod_User',sCod_User)
            .set('sCod_Product',sCod_Product)
            .set('sLotNumber',sLotNumber)
            .set('nQuantity',nQuantity)
            .set('sLocationSource',sLocationSource)
            .set('sLocationTarget',sLocationTarget)
            .set('sUnit',sUnit)
            .set('sCompany',sCompany)
            .set('licenseplate',licenseplate)
            .set('invoice',invoice)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        return res
      }),
      catchError(this.baseService.handleError)
    )
  }

  discretionalRelocationByPallet(licensePlate:string,locationSource:string,locationTarget:string,relocationReason:string,codUser:string):Observable<BcgResult>
  {
    let url='Relocation/DiscretionalRelocationByPallet/'
    let params = new HttpParams()
    .set('license_plate',licensePlate)
    .set('source_location',locationSource)
    .set('target_location',locationTarget)
    .set('relocation_reason',relocationReason)
    .set('cod_user',codUser)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        return res
      }),
      catchError(this.baseService.handleError)
    )
  }
  movePalletInTruck(palletId:string,truckId:string,CodUser:string,locationSource:string,taskNumber:string):Observable<BcgResult>
  {
   
    let url='Relocation/MovePalletInTruck'
    let params  = new HttpParams()
    .set('palletId',palletId)
    .set('truckId',truckId)
    .set('codUser',CodUser)
    .set('locationSource',locationSource)
    .set('theTasknumber',taskNumber)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        return res
      }),
      catchError(this.baseService.handleError)
    )
  }
  getPallets(truckId:string) : Observable<BcgResult>
    {
        let url = `Relocation/getPalletsInTruck`
        let params = new HttpParams()
            .set('truckId', truckId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
        catchError(this.baseService.handleError))
    }
  validatePallet(palletId:string,locationSource:string,codUser:string,suggestedSourceLocation:string):Observable<BcgResult>
  {
      let url ='Relocation/validatePallet'
      let params = new HttpParams()
        .set('palletId',palletId)
        .set('locationSource',locationSource)
        .set('codUser',codUser)
        .set('suggestedSourceLocation',suggestedSourceLocation)
      return this.http.get<BcgResult>(url,{params : params}).pipe(
        catchError(this.baseService.handleError)
      )
  }
}
