import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonFrontModule } from '../common/common.module';
import { UserService } from '../service/user/user.service';
import { ICredentials } from '../interfaces/credentials.interface';
import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { ICredentialsUC } from '../common/credentials.uc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonFrontModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends ICredentialsUC {
  error: string = '';
  formSubmited: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly userService: UserService,
    localStorageService: LocalStorageService,
    router: Router,
  ) {
    super(localStorageService, router);
  }

  submit() {
    this.formSubmited = true;
    if (!this.form.valid) return;
    this.userService.signIn({
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }).subscribe((credentials: ICredentials) => {
      if (!credentials){
        this.error = 'email or password invalid';
        return;
      }
      this.setCredentials(credentials);
    })
  }
}
