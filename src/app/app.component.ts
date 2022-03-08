import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MonitoringService } from './services/monitoring.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eWMS';



  constructor(private swUpdate: SwUpdate, 
    private loggingService: MonitoringService) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        let iVersion = +environment.version
        iVersion++

        if (confirm(`La nueva version 1.0.0.${iVersion} se encuentra disponible para actualizar`)) {
          window.location.reload();
        } else {
        }
      });
    }
  }
}
