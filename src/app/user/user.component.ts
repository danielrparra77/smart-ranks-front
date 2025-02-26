import { Component } from '@angular/core';
import { UserProductComponent } from "./user-product/user-product.component";
import { LogoutComponent } from "../common/logout/logout.component";

@Component({
  selector: 'app-user',
  imports: [UserProductComponent, LogoutComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
