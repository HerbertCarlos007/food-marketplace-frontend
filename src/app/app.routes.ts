import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CartComponent } from './components/cart/cart.component';
import { StoresComponent } from './components/stores/stores.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'stores', component: StoresComponent},
    {path: 'home', component: HomeComponent},
    {path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard]},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'cart', component: CartComponent}
];
