import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  sendNotificationBO(message_type: string, message_subject: string, priority: string, user: string): Observable<boolean> {
    let url = `Message/addMessage`
    let params = {
      message_type: message_type,
      message_subject: message_subject,
      priority: priority,
      userName: user
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
}
