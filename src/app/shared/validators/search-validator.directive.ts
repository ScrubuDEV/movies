// src/app/shared/validators/search-validator.directive.ts
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export interface SearchValidationErrors {
  minLength?: { requiredLength: number; actualLength: number };
  alphanumeric?: boolean;
}

@Directive({
  selector: '[appSearchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchValidatorDirective),
      multi: true,
    },
  ],
})
export class SearchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value ?? '';
    const errors: SearchValidationErrors = {};

    if (val.length > 0 && val.length < 3) {
      errors.minLength = { requiredLength: 3, actualLength: val.length };
    }

    if (val.length > 0 && !/^[a-zA-Z0-9]+$/.test(val)) {
      errors.alphanumeric = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}
