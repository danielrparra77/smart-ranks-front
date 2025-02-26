import { Router } from '@angular/router';
import { ICredentials } from '../interfaces/credentials.interface';
import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { RoleEnum } from '../enum/role.enum';

export abstract class ICredentialsUC {
  credentialsKey = 'c';
  constructor (
    protected readonly localStorageService: LocalStorageService,
    protected readonly router: Router,
  ) {}

  getCredentials(): ICredentials{
    const credentials = this.localStorageService.get(this.credentialsKey);
    if (credentials) return JSON.parse(credentials) as ICredentials;
    this.router.navigate(['login']);
    throw 'not credentials found';
  }

  setCredentials(credentials: ICredentials): void{
    this.localStorageService.set(this.credentialsKey, JSON.stringify(credentials));
    if (credentials.role == RoleEnum.administrator){
      this.router.navigate(['admin']);
      return;
    }
    if (credentials.role == RoleEnum.user){
      this.router.navigate(['user']);
      return;
    }
  }
}