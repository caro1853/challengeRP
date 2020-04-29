import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styles: []
})
export class UserAdminComponent implements OnInit {

  users: IUser[];

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getAllUser().subscribe((data:IUser[]) => {
      console.log({data});
      this.users = data;
    }, (err) => {
        if (err['status'] === 401) {
          this.router.navigate(['/login']);
        }
        else {
          this.showAlert(err);
        }      
    });
  }

  newUser(){
    this.router.navigate(['/usercreate']);
  }

  editUser(id){
    this.router.navigate(['/useredit', id ]);
  }

  deleteUser(id, index) {


    Swal.fire({
      title: 'Está seguro?',
      text: "Se borrará el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {

        this._userService.deleteUser(id).subscribe(res => {
          console.log({ res });

          if (res === true) {
            this.users.splice(index, 1);
          }
        });        
      }
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
