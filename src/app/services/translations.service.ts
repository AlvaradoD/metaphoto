import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Translation } from '../interfaces/translation.interface';
import { BcgResult } from '../interfaces/bcg-result.interface';
import Dexie from 'dexie';
import { DexieService } from './dexie.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  dbTranslations: Dexie.Table<Translation, string>

  constructor(
    private http: HttpClient,
    private dexieService: DexieService,
    private baseService: BaseService
  ) {
    this.dbTranslations = this.dexieService.table('translations')
  }

  init(lang:string): void {
    this.dbTranslations.count().then(count => {
      if (count == 0)
        this.initialize(lang)
    })
  }

  initialize(lang: string): void {
    let url = `LangHelper/LoadTranslations`
    let params = new HttpParams()
      .set('SelectedLang', lang)

    let records = this.http.get<BcgResult>(url, { params: params }).pipe(
      map(res => {
        let trans: any
        if (res.success) 
          trans = res.related_data
        return trans
      }),
      catchError(this.baseService.handleError)
    )
    //debugger;
    records.subscribe(
      data => {
        let translations = data.map(function (text) {
          let trans = text.translation.split('^')
          return { id: trans[0].trim(), text: trans[1].trim() }
        })
        this.addTranslations(translations)
      }
    )
  }

  addTranslations(data: Translation[]) {
    return this.dbTranslations.bulkAdd(data)
  }

}
