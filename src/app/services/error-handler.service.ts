import { ErrorHandler, Injectable } from '@angular/core';
import { MonitoringService } from './monitoring.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private loggingService: MonitoringService) {
    super();
  }

  handleError(error: Error) {
    this.loggingService.logException(error); // Manually log exception
  }
}
