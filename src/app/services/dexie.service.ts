import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {

  constructor() {
    super('eWMS')
    this.version(1).stores({
      translations: 'id'
    })
  }
}
