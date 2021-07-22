import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/aut.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/app/user-profile', title: 'Usuario',  icon:'person', class: '' },
    { path: '/app/table-list', title: 'Pacientes',  icon:'content_paste', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userData: any;
  constructor(private _authService: AuthService) { }

  ngOnInit() {

    this.userData = this._authService.getUserData();

    if (this.userData.tipo_usuario === 1) {

      let ruta_admin = { path: '/app/user-list', title: 'Gestion usuarios',  icon:'manage_accounts', class: '' }

      ROUTES.push(ruta_admin)
    }

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logOut(): void {
    this._authService.logOut();
}
}
