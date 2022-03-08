import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { DistributionCenter } from '../interfaces/distribution-center.interface';

@Injectable({
  providedIn: 'root'
})
export class DistributionCentersService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  getAll(): Observable<DistributionCenter[]> {
    let url = `DistributionCenters`
    return this.http.get<DistributionCenter[]>(url).pipe(
      catchError(this.baseService.handleError)
    )
  }
  
}
