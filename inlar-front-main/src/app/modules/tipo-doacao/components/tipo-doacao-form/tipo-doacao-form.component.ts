import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TipoDoacaoService } from 'src/app/services/tipo-doacao/tipo-doacao.service';
import { GetTipoDoacaoResponse } from 'src/app/models/interfaces/tipo-doacao/responses/GetTipoDoacaoResponse';
import { isValid as isValidCPF } from '@fnando/cpf';
import { isValid as isValidCNPJ } from '@fnando/cnpj';

@Component({
  selector: 'app-tipo-doacao-form',
  templateUrl: './tipo-doacao-form.component.html',
  styleUrls: []
})
export class TipoDoacaoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();


  public tipodoacaoForm: FormGroup;
  public isEditing = false;

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private tipodoacaoService: TipoDoacaoService
  ) {
    this.tipodoacaoForm = this.formBuilder.group({
      idTipoDoacao: [null],
      nome: ['', Validators.required],
      tipo_pessoa: ['F', Validators.required],
      cpf: ['', this.cpfValidator],
      cnpj: ['',this.cnpjValidator],
      genero: ['', Validators.required],
      contato1: ['', Validators.required],
      contato2: [''],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      observacoes: [''],
      ativo: [true]
    });

   

  ngOnInit(): void {
    const doadorData = this.config.data?.event;

    if (doadorData) {
      this.isEditing = true;
      doadorData.idDoador = doadorData.id; 
      this.doadorService.getDoadorById(doadorData.id)
        .subscribe({
          next: (doador: GetDoadorResponse) => {
            this.populateForm(doador); 
          },
          error: (err) => {
            this.handleErrorMessage('Erro ao buscar dados do doador.');
          }
        });
    } else {
      this.isEditing = false;
      this.doadorForm.reset();
    }
  }

  handleSubmit(): void {
    if (this.doadorForm.valid) {
      const formData = { ...this.doadorForm.value };

      
      if (formData.tipo_pessoa === 'F' && formData.cpf) {
        formData.cpf = formData.cpf.replace(/\D/g, '');
        formData.cnpj = '';  
      }

     
      if (formData.contato1) {
        formData.contato1 = formData.contato1.replace(/\D/g, '');  
      }
      
      if (formData.contato2) {
        formData.contato2 = formData.contato2.replace(/\D/g, '');  
      }
  
      if (formData.tipo_pessoa === 'J' && formData.cnpj) {
        formData.cnpj = formData.cnpj.replace(/\D/g, '');
        formData.cpf = '';  
      }

      
      if (this.isEditing) {
        this.editDoador(formData);  
      } else {
        this.addDoador(formData);  
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private addDoador(formData: any): void {
    console.log('Adicionando doador com os dados:', formData);
    this.doadorService.createDoador(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoadorResponse) => {
          this.handleSuccessMessage('Doador criado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao criar doador!');
        }
      });
  }

  private editDoador(formData: any): void {
    const payload = { ...formData, id: formData.idDoador };
    this.doadorService.updateDoador(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doador editado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar doador!');
        }
      });
  }

  private populateForm(doador: GetDoadorResponse): void {
    this.doadorForm.patchValue({
      idDoador: doador.idDoador,
      nome: doador.nome,
      tipo_pessoa: doador.tipoPessoa,
      cpf: doador.cpf,
      cnpj: doador.cnpj,
      genero: doador.genero,
      contato1: doador.contato1,
      contato2: doador.contato2,
      cep: doador.cep,
      logradouro: doador.logradouro,
      numero: doador.numero,
      complemento: doador.complemento,
      bairro: doador.bairro,
      cidade: doador.cidade,
      uf: doador.uf,
      observacoes: doador.observacoes,
      ativo: doador.ativo
    });
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCPF(value.replace(/\D/g, ''))) {
      return { 'invalidCpf': true };
    }
    return null;
  }
  cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCNPJ(value.replace(/\D/g,  ''))) {
       return { 'invalidCnpj': true};
    }
      return null;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
