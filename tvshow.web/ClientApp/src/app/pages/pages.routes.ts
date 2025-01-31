import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { AuthGuard } from '../services/auth.guard';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'usercreate', component: UserCreateComponent, data: { titulo: 'Creación de usuario' }, canActivate: [AuthGuard] },
      { path: 'useradmin', component: UserAdminComponent, data: { titulo: 'Administración de usuarios' }, canActivate: [AuthGuard] },      
      { path: 'useredit/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' }, canActivate: [AuthGuard] },
      { path: 'catalog', component: CatalogComponent, data: { titulo: 'Catálogo' } },
      { path: 'catalog/:id', component: CatalogCardComponent, data: { titulo: 'Catálogo' } },
      { path: '', redirectTo: '/catalog', pathMatch: 'full' }      
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
