import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { IUser } from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    baseUrl: string = '';
    controlller: string = 'user';
  pathservice = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) { 
    this.baseUrl = _baseUrl;
    this.pathservice = this.baseUrl + "api/" + this.controlller;
  }

  createUser(user: IUser) {

    let token = this.getTokenSaved();

    return this._http.post(this.pathservice, user, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });
  }

  getTokenSaved() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return '';
    }
  }

  getAllUser() {
    
    let token = this.getTokenSaved();       

    return this._http.get(this.pathservice, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });
  }

  getUserById(id) {

    let token = this.getTokenSaved();

    return this._http.get(this.pathservice + '/' + id, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });

  }

  updateUser(id, user: IUser) {

    let token = this.getTokenSaved();

    return this._http.put(this.pathservice + '/' + id, user , {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });
  }

  deleteUser(id) {

    let token = this.getTokenSaved();

    return this._http.delete(this.pathservice + '/' + id, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });

  }
}
