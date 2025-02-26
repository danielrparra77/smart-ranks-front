import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { ICredentialsUC } from '../common/credentials.uc';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard extends ICredentialsUC implements CanActivate {
  constructor(localStorageService: LocalStorageService, router: Router) {
    super(localStorageService, router);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const credentials = this.getCredentials();
      if (credentials)
        return true;
      this.router.navigate(['login']);
      return false;
  }
}