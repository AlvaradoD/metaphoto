import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service'
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { StorageService } from '../../../services/storage.service';
import { LangService } from '../../../services/lang.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  taskCount: number = 0
  menu: MenuItem[]


  appVersion: string
  username: string
  forklift: string
  assignedTasksInterval: number = 3600
  lblSignOut: string


  constructor(
    private authService: AuthService,    
    private securityService: SecurityService,
    private globals: StorageService,
    private router: Router,
    private langService: LangService
  ) { }

  ngOnInit() {
    // this.userService.getAssignedTasks().subscribe(data => {
    //   this.taskCount = data.pickingcount + data.relocationcount
    // })

    this.langService.get("T802", "Salir").then(text => this.lblSignOut = text)
    
    this.appVersion = environment.version
    this.username = this.globals.getLocalStorageValue("publicUserName")
    this.forklift = this.globals.getLocalStorageValue("publicForklift")

    const userId = this.authService.getUserId()


    this.securityService.getMenus(this.authService.getUserId(), 0).subscribe(data => {
      this.menu = data

      this.menu.map( i => {  this.langService.get("MN"+i.codMenu,i.name).then(t=> i.name = t) })


    })
  }

  signOut(){
    /*this.authService.logoutApp(this.globals.getLocalStorageValue("publicDC"),
    this.globals.getLocalStorageValue("publicForklift")).subscribe(
      data => {
        this.authService.logout()
        this.router.navigate(['login'])
      },
      error => {
        
      }
    )*/
    this.authService.logout()
    this.router.navigate(['login'])
  }

  translate(args){

    console.log("translate",args)
  }


}
