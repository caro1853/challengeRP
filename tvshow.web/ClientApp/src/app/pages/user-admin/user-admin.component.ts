import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.interface';


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
    });
  }

  newUser(){
    this.router.navigate(['/usercreate']);
  }

  editUser(id){
    this.router.navigate(['/useredit', id ]);
  }

  deleteUser(id, index) {
    this._userService.deleteUser(id).subscribe(res => {
      console.log({ res });

      if (res === true) {
        this.users.splice(index, 1);
      }
    });
  }
}
