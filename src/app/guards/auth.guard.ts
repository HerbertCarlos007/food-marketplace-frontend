import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.usersService.getUserRole();

    if (userRole === 'administrador') {
      console.log('olaaa')
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
