import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonFrontModule } from '../../common/common.module';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../service/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';

@Component({
  selector: 'app-admin-user',
  imports: [CommonFrontModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  constructor(
    private readonly userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    this.getUsers();
  }

  readonly dialog = inject(MatDialog);
  users: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  displayedColumns: string[] = ['name', 'email', 'role', 'edit'];

  getUsers(): void {
    this.userService.getUsers()
    .subscribe((users: IUser[]) => {
      this.users.data = users;
      this.users.data = this.users.data;
      this.changeDetectorRefs.detectChanges();
    })
  }

  createUser(): void {
    const dialogRef = this.dialog.open(AdminNewUserComponent, {
      data: {new: true},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getUsers();
      }
    });
  }

  editUser(user: IUser): void {
    const dialogRef = this.dialog.open(AdminNewUserComponent, {
      data: {new: false, name: user.name, email: user.email},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getUsers();
      }
    });
  }
}
