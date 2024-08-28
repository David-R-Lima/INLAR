import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { isValid as isValidCNPJ } from '@fnando/cnpj';

@Directive({
  selector: '[appCnpjValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CnpjValidatorDirective, multi: true }]
})
export class CnpjValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCNPJ(value.replace(/\D/g, ''))) {
      return { 'invalidCnpj': true };
    }
    return null;
  }
}
