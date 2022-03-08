import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let baseUri = environment.baseUri
    let date = new Date()
    let timezoneOffset = date.getTimezoneOffset()
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (!baseUri.endsWith('/')) baseUri = baseUri + '/'
    const fullReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
        .set('ewms-timezone-offset', String(timezoneOffset))
        .set('ewms-timezone', timezone),
      url: `${baseUri}${req.url}`
    })
    return next.handle(fullReq);
  }

}
