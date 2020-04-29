import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  role = '';

  constructor(private _loginService: LoginService, private _router: Router) {
    this.role = this._loginService.getRol();
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  exitSesion() {
    this._loginService.closeSesion();
    this._router.navigate(['/login']);
  }
}
