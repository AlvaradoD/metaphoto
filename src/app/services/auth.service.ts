import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { BaseService } from './base.service';
import { BcgResult } from '../interfaces/bcg-result.interface';
import Dexie from 'dexie';
import { Translation } from '../interfaces/translation.interface';
import { DexieService } from './dexie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = '/'
  dbTranslations: Dexie.Table<Translation, string>

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private dexieService: DexieService) { }



  login(username: string, password: string, distributionCenter: string, forklift: string): Observable<BcgResult> {

    console.log("login");

    let url = `Auth/LogInApp`

    let value: any = {
      username: username,
      password: password,
      dc: distributionCenter,
      forklift: forklift
    }

    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('dc', distributionCenter)
      .set('forklift', forklift)

     // return this.http.post<BcgResult>(url, { params: params })
     return this.http.post<BcgResult>(url,value)
      .pipe(
        //catchError(this.handleError)
        catchError(this.baseService.handleError)
      );

    // return this.http.get<BcgResult>(url, { params: params })
    //   .pipe(
    //     //catchError(this.handleError)
    //     catchError(this.baseService.handleError)
    //   );
  }



  AuthorizeDevice(deviceId: string, code_DC: string): Observable<BcgResult> {

    console.log("AuthorizeDevice");

    let url = `Auth/AuthorizeDevice`

    let params = new HttpParams()
      .set('deviceId', deviceId)
      .set('code_DC', code_DC)

   


     return this.http.post<BcgResult>(url, { params: params })
      .pipe(

        catchError(this.baseService.handleError)
      );


  }



  getAuthorizeDevice(device: string,
    dc: string): Observable<BcgResult> {
    let url = `Auth/AuthorizeDevice`
    let params = new HttpParams()
      .set('deviceId', device)
      .set('code_DC', dc)
      
    return this.http.get<BcgResult>(url, { params: params }).pipe(
      catchError(this.baseService.handleError)
    )
  }




  logoutApp(distributionCenter: string, truck: string): Observable<object> {
    let url = `Auth/LogOutApp`
    let params = new HttpParams()
      .set('dc', distributionCenter)
      .set('truck', truck)
    return this.http.get(url, { params: params })
      .pipe(
        //catchError(this.handleError)
        catchError(this.baseService.handleError)
      );
  }

  logout(): void {
    localStorage.clear()
    this.dbTranslations = this.dexieService.table('translations')
    this.dbTranslations.clear()
  }

  setLogin(userId: string): void {
    localStorage.setItem("userId", userId)
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem("userId") != null) return true
    return false
  }

  getUserId(): string {
    return localStorage.getItem("userId")
  }

}
