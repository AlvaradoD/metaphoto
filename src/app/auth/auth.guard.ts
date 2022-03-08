import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state)
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) { return true }
    // Store the attemped URL for redirecting
    if (typeof url === 'undefined') url = '/'
    this.authService.redirectUrl = url
    // Navigate to the login page with extras
    this.router.navigate(['/login'])
    return false
  }
  
}
