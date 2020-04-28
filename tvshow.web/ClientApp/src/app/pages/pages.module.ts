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

@NgModule({
  declarations: [
    PagesComponent,
    UserCreateComponent,
    UserAdminComponent,
    UserEditComponent,
    CatalogComponent,
    NoimagePipe,
    CatalogCardComponent
  ],
  exports: [
    UserCreateComponent
  ],
  imports: [ 
    PAGES_ROUTES,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class PageModule { }
