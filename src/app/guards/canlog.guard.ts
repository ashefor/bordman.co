import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanlogGuard implements CanLoad {
  constructor(private authservice: AuthService, private router: Router){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authservice.isLoggedIn){
      this.router.navigateByUrl('/')
      console.log('what')
    }else{
      return true;
    }
  }
}
