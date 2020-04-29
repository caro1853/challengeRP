import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  equalsPasswords(pass1NameControl: string, pass2NameControl: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1NameControl];
      const pass2Control = formGroup.controls[pass2NameControl];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          passwordsIguales: true
        });
      }

    }

  }
}
