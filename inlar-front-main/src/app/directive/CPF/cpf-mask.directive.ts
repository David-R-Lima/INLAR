import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Limita o valor a no máximo 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Formata o CPF
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    } else if (value.length > 0) {
      value = value.replace(/(\d{3})/, '$1');
    }

    // Atualiza o campo de input visualmente
    input.value = value;

    // Atualiza o valor do FormControl no Angular (somente os números, sem a máscara)
    this.control.control?.setValue(value.replace(/\D/g, ''), { emitEvent: false });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Limita a entrada de números e teclas de controle (como Backspace, Delete, etc.)
    const allowedKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'
    ];

    // Permite apenas dígitos e as teclas de controle mencionadas
    if (!allowedKeys.includes(event.key) && !/\d/.test(event.key)) {
      event.preventDefault();  // Impede qualquer outro tipo de entrada
    }
  }
}
