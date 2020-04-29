import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styles: []
})
export class CatalogCardComponent implements OnInit {

  catalog: any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _catalogService: CatalogService, private router: Router) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {    

    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {

        this._catalogService.getShowById(params['id']).subscribe((data: any) => {
          console.log({ data });
          if (data) {
            this.catalog = data;            
          }
        });

      }
    });
  }

  return() {
    this.router.navigate(['/catalog']);
  }

}
