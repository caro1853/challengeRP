import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: any, origen: string): unknown {

    let imgReturn = 'medium';

    if (origen === 'card') {
      imgReturn = 'original';
    }

    if (!image) {
      return 'assets/img/noimage.png';
    }

    if (!image[imgReturn]) {
      return 'assets/img/noimage.png';
    }

    return image[imgReturn];    
  }

}
