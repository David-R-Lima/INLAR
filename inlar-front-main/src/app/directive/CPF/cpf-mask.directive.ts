import { Directive, ElementRef, HostListener } from '@angular/core';
import { format as formatCPF } from '@fnando/cpf';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      event.target.value = value.slice(0, 11);
    }
    event.target.value = formatCPF(value);
  }
}
