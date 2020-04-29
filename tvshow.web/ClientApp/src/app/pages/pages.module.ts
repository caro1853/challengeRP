import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { PAGES_ROUTES } from './pages.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { PagesComponent } from './pages.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NoimagePipe } from '../pipes/noimage.pipe';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    PagesComponent,
    UserCreateComponent,
    UserAdminComponent,
    UserEditComponent,
    CatalogComponent,
    NoimagePipe,
    CatalogCardComponent,
    NavMenuComponent
  ],
  exports: [
    UserCreateComponent
  ],
  imports: [ 
    PAGES_ROUTES,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: []
})
export class PageModule { }
