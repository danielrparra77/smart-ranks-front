import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorizeGuard } from './guard/authorize.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthorizeGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthorizeGuard] },
];
