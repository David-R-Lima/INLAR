import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { isValid as isValidCPF } from '@fnando/cpf';

@Directive({
  selector: '[appCpfValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true }]
})
export class CpfValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCPF(value.replace(/\D/g, ''))) {
      return { 'invalidCpf': true };
    }
    return null;
  }
}
