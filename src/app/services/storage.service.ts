import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private baseService:BaseService) { }

  setLocalStorageValue(key:string, value:any): void
  {
    //save new value with updated value
    localStorage.setItem(key, value); 
  }

  getLocalStorageValue(key:string)
  {
    return localStorage.getItem(key)
  }  
}
