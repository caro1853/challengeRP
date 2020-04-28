"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages.component");
var user_create_component_1 = require("./user-create/user-create.component");
var user_admin_component_1 = require("./user-admin/user-admin.component");
var user_edit_component_1 = require("./user-edit/user-edit.component");
var catalog_component_1 = require("./catalog/catalog.component");
var catalog_card_component_1 = require("./catalog-card/catalog-card.component");
var pagesRoutes = [
    {
        path: '', component: pages_component_1.PagesComponent,
        children: [
            { path: 'usercreate', component: user_create_component_1.UserCreateComponent, data: { titulo: 'Creación de usuario' } },
            { path: 'useradmin', component: user_admin_component_1.UserAdminComponent, data: { titulo: 'Administración de usuarios' } },
            { path: 'useredit/:id', component: user_edit_component_1.UserEditComponent, data: { titulo: 'Editar usuario' } },
            { path: 'catalog', component: catalog_component_1.CatalogComponent, data: { titulo: 'Catálogo' } },
            { path: 'catalog/:id', component: catalog_card_component_1.CatalogCardComponent, data: { titulo: 'Catálogo' } },
            { path: '', redirectTo: '/useradmin', pathMatch: 'full' }
        ]
    }
];
exports.PAGES_ROUTES = router_1.RouterModule.forChild(pagesRoutes);
//# sourceMappingURL=pages.routes.js.map