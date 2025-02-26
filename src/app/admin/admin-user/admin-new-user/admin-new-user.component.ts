import { Component, inject } from '@angular/core';
import { CommonFrontModule } from '../../../common/common.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { IUser, IUserUpsert } from '../../../interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user/user.service';
import { IDialog } from '../../../common/dialog.uc';

@Component({
  selector: 'app-admin-new-user',
  imports: [
    CommonFrontModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './admin-new-user.component.html',
  styleUrl: './admin-new-user.component.css'
})
export class AdminNewUserComponent extends IDialog {
  readonly data = inject<IUserUpsert>(MAT_DIALOG_DATA);
  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
  });
  error:string = '';

  constructor (private readonly userService: UserService) {
    const dialogRef = inject(MatDialogRef<AdminNewUserComponent>);
    super(dialogRef);
    if (this.data.new)
      this.form.addControl(
        'password',
        new FormControl('', [Validators.required]),
      );
  }

  submit(): void {
    if (!this.form.valid) return;
    this.userService.upsertUser(this.form.getRawValue())
      .subscribe((user: IUser) => {
        if (!user){
          this.error = 'error updating user';
          return;
        }
        this.dialogRef.close(user);
      });
  }
}
