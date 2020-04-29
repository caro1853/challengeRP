import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent {

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private router: Router, private _customValidatorsService: CustomValidatorsService) {
    this.createForm();
  }

  createForm() {

    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required]
    }, {
      validators: this._customValidatorsService.equalsPasswords('pass1', 'pass2')
    });

  }

  saveUser() {
    if (this.form.invalid) {
      console.error('Hay un error');
      
      Object.values(this.form.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlInterno => controlInterno.markAllAsTouched())
        } else {
          control.markAllAsTouched();
        }
      });

    } else {
      const user :IUser = {
        name: this.form.value['name'],
        lastname: this.form.value['lastname'],
        email: this.form.value['email'],
        password: this.form.value['pass1']
      }

      this._userService.createUser(user).subscribe(res => {

        if ((res) && (res['ok'] === true)) {

          this.showAlertSuccess(res['message']);
          this.return();

        } else {

          this.showAlert(res['message']);

        }

      }, (err) => {               

          if (err.status === 400) {
            if (err['error']) {
              this.showAlert(err.error['message']);
              return;
            }
          }
          
          this.showAlert(err['message']);         
          
      });

      console.log(this.form.value);
    }
  }

  showAlert(message) {

    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      timer: 3000
    });
  }

  showAlertSuccess(message) {

    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });

  }

  controlValid(namecontrol: string) {
    return this.form.get(namecontrol).invalid && this.form.get(namecontrol).touched;
  }

  return() {
    this.router.navigate(['/useradmin']);
  }

}
