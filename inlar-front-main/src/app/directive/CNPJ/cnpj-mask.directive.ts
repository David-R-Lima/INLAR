import { Directive, ElementRef, HostListener } from '@angular/core';
import { format as formatCNPJ } from '@fnando/cnpj';

@Directive({
  selector: '[appCnpjMask]'
})
export class CnpjMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length > 14) {
      event.target.value = value.slice(0, 14);
    }
    event.target.value = formatCNPJ(value);
  }
}
