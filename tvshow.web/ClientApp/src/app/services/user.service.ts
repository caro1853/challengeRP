import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  createUser(user: IUser){
    return this._http.post(this.pathservice, user);
  }

  getAllUser() {    
    return this._http.get(this.pathservice);
  }

  getUserById(id){
    return this._http.get(this.pathservice + '/' + id);
  }

  updateUser(id, user: IUser) {
    return this._http.put(this.pathservice + '/' + id, user);
  }

  deleteUser(id) {
    return this._http.delete(this.pathservice + '/' + id);
  }
}
