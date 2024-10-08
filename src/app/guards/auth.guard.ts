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
    const userRole = this.usersService.getUserRole(); // Obtenha a role do usuário

    // Verifique se a role do usuário é 'Admin'
    if (userRole === 'administrador') {
      console.log('olaaa')
      return true; // Permite o acesso
    }

    // Se não, redireciona ou retorna false
    this.router.navigate(['/unauthorized']); // Redireciona para uma página de não autorizado, por exemplo
    return false;
  }
}
