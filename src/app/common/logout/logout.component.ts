import { Component } from '@angular/core';
import { CommonFrontModule } from '../common.module';
import { ICredentialsUC } from '../credentials.uc';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ICredentials } from '../../interfaces/credentials.interface';

@Component({
  selector: 'app-logout',
  imports: [CommonFrontModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent extends ICredentialsUC {
  constructor(
    localStorageService: LocalStorageService,
    router: Router,
  ) {
    super(localStorageService, router);
  }

  logout() {
    this.signOut();
  }
}
