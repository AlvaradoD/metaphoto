import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralTaskService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  getGeneralTask(userID: string): Observable<BcgResult> {
    let url = 'General/getGeneralTask'
    let params = new HttpParams()
      .set('userID', userID)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        return res
      })
    )
  }

  updateTask(TaskNumber: string): Observable<BcgResult> {
    let url = 'General/updateTask'
    let params = new HttpParams()
      .set('TaskNumber', TaskNumber)

    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError),
      map(res => {
        return res
      })
    )
  }
}
