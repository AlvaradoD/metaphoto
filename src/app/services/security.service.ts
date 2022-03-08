import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BcgResult } from '../interfaces/bcg-result.interface'
import { BaseService } from './base.service'

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    constructor(
        private http: HttpClient,
        private baseService: BaseService
    ) { }

    getMenus(userId: string, parent: number){
        let url = `Security/getMenus`
        let params = new HttpParams()
        .set('codUser', userId)
        .set('parent', parent.toString())

        return this.http.get<BcgResult>(url, { params: params }).pipe(
            map(res => {
                let items: any
                if (res.success) items = res.related_data
                return items
            }),
            catchError(this.baseService.handleError)
        )
    }
}