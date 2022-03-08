import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }


  handleError(error: HttpErrorResponse) {
    let responseMessage: string

    if (error.error instanceof ErrorEvent) {
      responseMessage = error.error.message
    } else {
      responseMessage = error.message
    }
    return throwError(responseMessage)
  }

  removeDotOnEnter(event, data: string): boolean | string{
    // if(data.length == 21){
    //   return data.replace(/\./g, ' ')
    // }
    // return false
    if (event.keyCode == 13 || event.keyCode == 9){
      return data // data.replace(/\./g, ' ')
    } 
    else if (event.keyCode == 17 || event.keyCode == 74){
      event.preventDefault()
    }
    return false
  }
}
