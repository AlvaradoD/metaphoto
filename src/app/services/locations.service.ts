import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { Element } from '../interfaces/element.interface';
import { InitStock } from '../interfaces/init-stock.interface';
import { StockInLocation } from '../interfaces/stock-in-location.interface';
import { LocationDescription } from '../interfaces/location-description.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  getLocationsByType(type: string, allowarrival: string, dc: string): Observable<LocationDescription[]> {
    let url = `Location/GetLocations_ByType`
    let params = new HttpParams()
      .set('Type', type)
      .set('Allowarrival', allowarrival)
      .set('dc', dc)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let content: LocationDescription[]
        if (res.success)
          content = res.related_data as LocationDescription[]
        return content
      }),
      catchError(this.baseService.handleError)
    )
  }

  getStockInLocation(userCode: string, location: string): Observable<StockInLocation[]> {
    let url = `Location/GetStockOnLocation`
    let params = new HttpParams()
      .set('usercode', userCode)
      .set('location', location)
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let content: StockInLocation[]
        if (res.success)
          content = res.related_data
        return content
      }),
      catchError(this.baseService.handleError)
    )
  }

  getLocationDescription(location: string): Observable<string> {
    let url = `Location/GetLocationDescription`
    let params = new HttpParams()
      .set('location', location)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let result: string
        if (res.success)
          result = res.data
        return result
      }),
      catchError(this.baseService.handleError)
    )
  }

  getProductInventoryDetail(count: number, location: string): Observable<StockInLocation[]> {
    let url = `Location/getProductInvDetail`
    let params = new HttpParams()
      .set('noConteo', count.toString())
      .set('location', location)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: StockInLocation[]
        if (res.success) {
          if (res.related_data) {
            data = res.related_data as StockInLocation[]
          }
        }
        return data
      })
    )
  }

  getMaxAllowOversize(): Observable<number> {
    let url = `Location/LocationMaxOversize`
    return this.http.get<BcgResult>(url).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        let data: number
        if (res.success) data = res.related_data as number
        else data = -1
        return data
      })
    )
  }

  assignLocationOversize(location: string, size: number, dcId: string): Observable<boolean> {
    let url = `Location/AssignLocationOversize`
    let params = {
      locationId: location,
      maxSize: size,
      warehouseId: dcId
    }

    return this.http.post<BcgResult>(url, params).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        return res.success
      })
    )
  }
}


