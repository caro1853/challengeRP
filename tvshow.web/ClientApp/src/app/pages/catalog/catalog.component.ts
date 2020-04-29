import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { SearchModel } from '../../models/search.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styles: []
})
export class CatalogComponent implements OnInit {

  infosearch: SearchModel = new SearchModel();

  catalogs: any[] = [];

  searchword: string = '';

  constructor(private _catalogService: CatalogService, private _router: Router, private _loginService: LoginService) {

    if (this._loginService.isAuthenticated() !== true) {
      this._router.navigate(['/login']);
    }    
  }

  ngOnInit() {
    this.getCatalogFull();
  }

  getCatalogFull() {
    this._catalogService.getCatalogFull().subscribe((data: any[]) => {
      this.catalogs = data;
      console.log('data', this.catalogs);
    }, (err) => {
        console.log('este es el error:', err);
    });
  }

  onSearch(formulario: NgForm) {    

    this._catalogService.getSearch(this.infosearch).subscribe((data: any[]) => {

      console.log('nueva data', data);

      this.catalogs = data;

    });
  }

  viewShow(id) {
    this._router.navigate(['/catalog', id]);
  }

}
