import { Component, OnInit, SkipSelf } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { interval } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import { LangService } from 'src/app/services/lang.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  appVersion: string
  username: string
  forklift: string
  assignedTasksInterval: number = 3600
  lblSignOut: string

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private globals: StorageService,
    private langService: LangService,
    private router: Router
  ) { }

  ngOnInit() {

    this.langService.get("T802", "Salir").then(text => this.lblSignOut = text)

    this.appVersion = environment.version
    this.username = this.globals.getLocalStorageValue("publicUserName")
    this.forklift = this.globals.getLocalStorageValue("publicForklift")

    const userId = this.authService.getUserId()
   
  }

  signOut() {
   
    this.authService.logout()
    this.router.navigate(['login'])
  }
}
