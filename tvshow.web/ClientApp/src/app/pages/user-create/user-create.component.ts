import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent {

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService) {
    this.createForm();
  }

  createForm() {

    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required]
    });

  }

  saveUser() {
    if (this.form.invalid) {
      console.error('Hay un error');
      /*
      Object.values(this.form.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlInterno => controlInterno.markAllAsTouched())
        } else {
          control.markAllAsTouched();
        }
      });*/
    } else {
      const user :IUser = {
        name: this.form.value['name'],
        lastname: this.form.value['lastname'],
        email: this.form.value['email'],
        password: this.form.value['password']
      }

      this._userService.createUser(user).subscribe(res => {
        console.log('respuesta desde el servicio ' + res);
      });

      console.log(this.form.value);
    }
  }

}
