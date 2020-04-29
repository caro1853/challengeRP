import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email11 = '';
  password11 = '';

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
  }

  onSigin(formulario: NgForm) {

    console.log(this.email11);
    console.log(this.password11);

    this._loginService.validateUser(this.email11, this.password11).subscribe(data => {      
      this._router.navigate(['/catalog']);
    }, (err) => {        
        this.showAlert(err);
    });    
  }


  showAlert(err) {

    Swal.fire({
      title: 'Error!',
      text: err.statusText,
      icon: 'error',
      timer: 2000
    });
  }

}
