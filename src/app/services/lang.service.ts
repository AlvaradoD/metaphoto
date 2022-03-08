import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from './dexie.service';
import { BaseService } from './base.service';
import { Translation } from '../interfaces/translation.interface';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  dbTranslations: Dexie.Table<Translation, string>

  constructor(
    private dexieService: DexieService,
    private baseService: BaseService
  ) {
    this.dbTranslations = this.dexieService.table('translations')
  }

  get(code: string, defaultText: string): Promise<string> {
    let record = this.dbTranslations.where('id').equalsIgnoreCase(code)
    return record.first().then(r => r.text ).catch(e => defaultText)
  }

}
