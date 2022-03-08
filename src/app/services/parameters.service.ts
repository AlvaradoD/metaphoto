import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  getParameter(configId: string): Observable<BcgResult> {
    let url = `Parameters/getParameter/`
    let params = new HttpParams()
      .set('configuration_id', configId)
    return this.http.get<BcgResult>(url).pipe(
      catchError(this.baseService.handleError)
    )
  }

}
