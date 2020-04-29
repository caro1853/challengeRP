import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { decode } from 'punycode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isTokenValid: boolean;

  baseUrl: string = '';
  constructor(private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string, private jwtHelper: JwtHelperService) {
    this.baseUrl = _baseUrl;
  }

  validateUser(email: string, password: string) {
    this.isTokenValid = false;

    return this._http.post(this.baseUrl + "api/" + 'login', { email, password })
      .pipe(
        map((res: any) => {          

          if (res.token) {
            localStorage.setItem('token', res.token);
            this.isTokenValid = true;
            return true;
          }

          return false;

        })
      );          
  }

  validateToken() {

    let token = this.getTokenSaved();

    return this._http.get(this.baseUrl + "api/" + 'login', {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    }).subscribe(data => {
      console.log({ data });
      }
    );

  }

  getTokenSaved() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return '';
    }
  }

  getRol() {
    let token = this.getTokenSaved();

    let infoToken = this.decodeToken(token);    

    return infoToken['role'];
  }


  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {

      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  closeSesion() {
    localStorage.removeItem('token');
    this.isTokenValid = false;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}
