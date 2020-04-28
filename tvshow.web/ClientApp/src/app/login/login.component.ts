import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor() { }

  ngOnInit() {
  }

  onSigin(formulario: NgForm) {

    
  }

}
