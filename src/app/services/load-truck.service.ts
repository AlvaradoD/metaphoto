import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StagePallet } from '../interfaces/stage-pallet.interface';
@Injectable({
  providedIn: 'root'
})
export class LoadTruckService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
  ) { }


  getFirstTask(codUser: string, dc: string): Observable<StagePallet> {
    let url = `LoadTruck/GetFirstTaskLoadTruck`
    let params = new HttpParams()
      .set('codUser', codUser)
      .set('dc', dc)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: StagePallet
        if (res.success) {
          data = res.related_data as StagePallet
        } else if (!res.success && res.data == "0") {
          data = null;
        }
        return data
      })
    )
  }
  getNextTask(WaveId: string): Observable<StagePallet> {
    let url = `LoadTruck/GetNextTaskLoadTruck`
    let params = new HttpParams()
      .set('waveId', WaveId)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: StagePallet
        if (res.success) {
          data = res.related_data as StagePallet
        } else if (!res.success && res.data == "0") {
          data = null;
        }
        return data
      })
    )
  }

  loadPalletToTruck(waveId: string, pallet: string, location: string, userId: string): Observable<boolean> {
    let url = `LoadTruck/Loadtruckv2`
    let params = {
      waveId: waveId,
      pallet: pallet,
      targetLocation: location,
      userId: userId
    }
    return this.http.post<BcgResult>(url, params).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: boolean;
        if (res.success) {
          data = res.success;
        }
        return data
      })
    )
  }

  closeWaveLoadTruck(waveId: string): Observable<boolean> {
    let url = `LoadTruck/closeWaveLoadtoTruck`
    let params = {
      waveId: waveId
    }
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: boolean
        if (res.success) {
          data = res.success
        }
        return data
      })
    )
  }
  

  /*
  
    getGateInformation(gate: string): Observable<string>{
      let url = `LoadTruck/getGateInformation`
      let params = new HttpParams().set('gate', gate)
  
      return this.http.get<BcgResult>(url, {params: params}).pipe(
        catchError(this.baseService.handleError),
        map(res=>{
          let data : string
          if (res.success) data = res.message
          return data
        })
      )
    }
  
   
  
    loadToTruck(WaveId: string,pallet:string,location:string,user:string): Observable<boolean>{
      let url = `LoadTruck/Loadtruckv2`
      let params = new HttpParams()
      .set('waveId', WaveId)
      .set('pallet', WaveId)
      .set('targetLocation', location)
      .set('userId', user)
      return this.http.get<BcgResult>(url, {params: params}).pipe(
        catchError(this.baseService.handleError),
        map(res=>{
          let data : boolean
          if (res.success) 
          {
            data = res.success
          }
          return data
        })
      )
    }*/

}
