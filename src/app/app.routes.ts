import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CartComponent } from './components/cart/cart.component';
import { StoresComponent } from './components/stores/stores.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [
    {path: '', component: StoresComponent},
    {path: 'login', component: LoginComponent},
    {path: 'create-store', component: CreateStoreComponent},
    {path: 'home', component: HomeComponent},
    {path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard]},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'cart', component: CartComponent},
    {path: 'admin-login', component: AdminLoginComponent}
];
