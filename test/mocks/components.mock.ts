import { Component } from '@angular/core';
import { UserProductComponent } from '../../src/app/user/user-product/user-product.component';
import { LogoutComponent } from '../../src/app/common/logout/logout.component';

@Component({
  selector: 'app-user-product',
  template: '<div></div>',
  standalone: true,
})
export class MockUserProductComponent {}

@Component({
  selector: 'app-logout',
  template: '<div></div>',
  standalone: true,
})
export class MockLogoutComponent {}