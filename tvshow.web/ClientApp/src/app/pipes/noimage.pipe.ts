import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: any, ...args: unknown[]): unknown {
    if (!image) {
      return 'assets/img/noimage.png';
    }

    if (!image.medium) {
      return 'assets/img/noimage.png';
    }

    return image.medium;    
  }

}
