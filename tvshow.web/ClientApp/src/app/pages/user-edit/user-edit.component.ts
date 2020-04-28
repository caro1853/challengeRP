import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {

  form: FormGroup;

  user: IUser = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _userService: UserService, private router: Router) {
    
  }

  getUser() {
    console.log('get user');
    
    this._activatedRoute.params.subscribe(params=>{
      if (params['id']){

        this._userService.getUserById(params['id']).subscribe((data: IUser) => {
          console.log({ data });
          if (data) {
            this.user = data;
            this.setValuesForm();
          }         
        });

      }
    });
  }

  setValuesForm() {

    this.form.setValue({
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email
    });

  }

  createForm() {

    this.form = this._formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(5)]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(5)]],
      email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]      
    });

  }

  ngOnInit() {
    this.createForm();
    this.getUser();
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
        email: this.form.value['email']        
      }

      this._userService.updateUser(this.user.id, user).subscribe(res => {
        
        if (res === true) {
          this.router.navigate(['/useradmin']);
        } else {
          console.log({ res });
        }
      });;
      console.log(this.form.value);
    }
  }

}
