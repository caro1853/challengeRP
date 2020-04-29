import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SearchModel } from '../models/search.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private _http: HttpClient) { }

  getCatalogFull() {
    return this._http.get('http://api.tvmaze.com/search/shows?q=a');
  }

  getSearch(infoSearch: SearchModel) {    

    return this._http.get('http://api.tvmaze.com/search/shows?q=' + infoSearch.keywords)
      .pipe(
        map((data: any[]) => {

          let res = data;

          //language          
          if (infoSearch.language) {
            res = res.filter(p => p.show['language'] === infoSearch.language);
          }

          //genre          
          if (infoSearch.genre) {
            res = res.filter(p => p.show['genres'] ? p.show.genres.indexOf(infoSearch.genre) >= 0 :true);
          }

          //channel
          if (infoSearch.channel) {
            res = res.filter(p => p.show['webChannel'] ? p.show.webChannel['name'] === infoSearch.channel: false );
          }

          //order
          if (infoSearch.order) {
            switch (infoSearch.order) {
              //------------------------------------
              case 'rating':

                res = res.sort((obj1, obj2) => {

                    let average1 = 0;
                    let average2 = 0;

                  if ((!obj1.show['rating']) || (obj1.show.rating['average'] === null)) {
                    average1 = 0;
                  }
                  else {
                    average1 = Number(obj1.show.rating.average);
                  }

                  if ((!obj2.show['rating']) || (obj2.show.rating['average'] === null)) {
                      average2 = 0;
                  }
                    else {
                    average2 = Number(obj2.show.rating.average);
                  }

                  console.log({
                    average1,
                    average2
                  });

                    if (average1 < average2) {
                      return 1;
                    }

                    if (average1 > average2) {
                      return -1;
                    }

                    return 0;
                });

                break;
            }
          }

          return res;
        })
      );

    
  }

  getShowById(id) {
    return this._http.get('http://api.tvmaze.com/shows/' + id + '?embed=episodes');
  }
}
