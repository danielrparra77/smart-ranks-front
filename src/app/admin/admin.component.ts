import { Component } from '@angular/core';
import { CommonFrontModule } from '../common/common.module';
import { AdminUserComponent } from "./admin-user/admin-user.component";

@Component({
  selector: 'app-admin',
  imports: [CommonFrontModule, AdminUserComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
