import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { ServerData } from '../interfaces/server-data.interface';
import { BaseService } from './base.service';
import { DefDomain } from '../interfaces/def-domain.interface'

@Injectable({
  providedIn: 'root'
})
export class DefDomainsService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  getServerData(): Observable<ServerData> {
    let url = `Domains/GetServerData/`    

    return this.http.get<BcgResult>(url).pipe(
      map(res => {
        let dsdata: ServerData
        if (res.success) {
          dsdata = res.related_data as ServerData
        }
        return dsdata
      }),
      retry(2),
      catchError(this.baseService.handleError)
    )
  }

  getFillDomains(domain: string, domainValue: string): Observable<DefDomain[]> {
    let url = `Domains/GetDomainsList`
    let params = new HttpParams()
      .set('domain', domain)
      .set('domainvalue', domainValue)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: DefDomain[]
        if (res.success) {
          data = res.related_data as DefDomain[]
        }
        return data;
      }),
      catchError(this.baseService.handleError)
    )
  }

  getFillDomainsBodegaRutero(domain: string, user: string): Observable<DefDomain[]> {
    let url = `Domains/BodegasDevolucionRuteros`
    let params = new HttpParams()
      .set('domain', domain)
      .set('user', user)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let data: DefDomain[]
        if (res.success) {
          data = res.related_data as DefDomain[]
        }
        return data;
      }),
      catchError(this.baseService.handleError)
    )
  }

}
