import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BcgResult } from '../interfaces/bcg-result.interface';
import { Counting } from '../interfaces/counting.interface';
import { UserDet } from '../interfaces/user-det.interface';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    initialCounting: Counting = {
        pickingcount: 0,
        relocationcount: 0,
        countsCount: 0,
        generalCount: 0,
        purchaseCount: 0,
        transferArrivalCount: 0,
        returnsCount: 0,
        otherArrivalCount: 0,
        pickinghighCount: 0
    }
    private assignedTasks = new BehaviorSubject(this.initialCounting)
    private beep = new Audio()

    constructor(private http: HttpClient, private baseService: BaseService) {
        this.beep.src = '/assets/beep.mp3'
        this.beep.load()
    }

    getUserDetails(userStatus: string): Observable<UserDet[]> {
        console.log("getUserDetails")
        let url = `Users/GetUserDetails`
        let params = new HttpParams()
            .set('userStatus', userStatus)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                let data: UserDet[]
                if (res.success) data = res.related_data as UserDet[]
                return data
            })
        )
    }
    getUsersInZoneLocation(locationId: string): Observable<UserDet[]> {
        console.log("getUserDetails")
        let url = `Users/getUsersInZone`
        let params = new HttpParams()
            .set('locationId', locationId)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                let data: UserDet[]
                if (res.success) data = res.related_data as UserDet[]
                return data
            })
        )
    }


    getUserType(usercode: string): Observable<string> {
        let url = `Users/GetUserType`
        let params = new HttpParams()
            .set('coduser', usercode)

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                let data: string
                if (res.success) {
                    data = res.data
                    return data
                }
                throw new Error('unsuccessful result')
            })
        )
    }

    setAssignedTasks(counting: Counting) {
        let prevValues: Counting = this.assignedTasks.getValue()
        // if (prevValues.pickingcount !== counting.pickingcount
        //     || prevValues.relocationcount !== counting.relocationcount
        //     || prevValues.countsCount !== counting.countsCount) {
        //         this.beep.play()
        //         navigator.vibrate([500]);
        //     }
        this.assignedTasks.next(counting)
    }

    getAssignedTasks(): Observable<Counting> {
        return this.assignedTasks.asObservable()
    }

    getFullName(codUser: string): Observable<BcgResult> {
        let url = `Users/getFullName`
        let params = new HttpParams()
            .set('cod_user', codUser)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }


    getAssignedTasksFromServer(user: string): Observable<Counting> {
        let url = `Users/GetAssignedTasks2`
        let params = new HttpParams()
            .set('user', user)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError),
            map(res => {
                let data: Counting
                if (res.success) data = res.related_data as Counting
                return data
            })
        )
    }

    getUserListInWarehouseByLocation(location: string, group: string): Observable<BcgResult> {
        let url = `Users/getUserListInWarehouseByLocation`
        let params = new HttpParams()
            .set('location', location)
            .set('group', group)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }

    getUserListReturn(location: string): Observable<BcgResult> {
        let url = `Users/getUserListReturn`
        let params = new HttpParams()
            .set('location', location)
        return this.http.get<BcgResult>(url, { params: params }).pipe(
            catchError(this.baseService.handleError)
        )
    }
}