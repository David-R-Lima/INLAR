import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoadorService } from 'src/app/services/doador/doador.service';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';
import { isValid as isValidCPF } from '@fnando/cpf';
import { isValid as isValidCNPJ } from '@fnando/cnpj';

@Component({
  selector: 'app-doador-form',
  templateUrl: './doador-form.component.html',
  styleUrls: []
})
export class DoadorFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public doadorForm: FormGroup;
  public isEditing = false;
  public estados: any[];
  public tiposPessoa: any[];

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doadorService: DoadorService
  ) {
    this.doadorForm = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      tipopessoa: ['', Validators.required],
      cpf: ['', this.cpfValidator],
      cnpj: ['', this.cnpjValidator],
      contato1: ['', Validators.required],
      contato2: [''],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // CEP com 8 dígitos
      logradoudo: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      siglaestado: ['', Validators.required],
      observacoes: [''],
      ativo: [true, Validators.required]
    });

    this.estados = [
      { label: 'Acre', value: 'AC' },
      { label: 'Alagoas', value: 'AL' },
      { label: 'Amapá', value: 'AP' },
      { label: 'Amazonas', value: 'AM' },
      { label: 'Bahia', value: 'BA' },
      { label: 'Ceará', value: 'CE' },
      { label: 'Distrito Federal', value: 'DF' },
      { label: 'Espírito Santo', value: 'ES' },
      { label: 'Goiás', value: 'GO' },
      { label: 'Maranhão', value: 'MA' },
      { label: 'Mato Grosso', value: 'MT' },
      { label: 'Mato Grosso do Sul', value: 'MS' },
      { label: 'Minas Gerais', value: 'MG' },
      { label: 'Pará', value: 'PA' },
      { label: 'Paraíba', value: 'PB' },
      { label: 'Paraná', value: 'PR' },
      { label: 'Pernambuco', value: 'PE' },
      { label: 'Piauí', value: 'PI' },
      { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Rio Grande do Norte', value: 'RN' },
      { label: 'Rio Grande do Sul', value: 'RS' },
      { label: 'Rondônia', value: 'RO' },
      { label: 'Roraima', value: 'RR' },
      { label: 'Santa Catarina', value: 'SC' },
      { label: 'São Paulo', value: 'SP' },
      { label: 'Sergipe', value: 'SE' },
      { label: 'Tocantins', value: 'TO' }
    ];

    this.tiposPessoa = [
      { label: 'Física', value: 'F' },
      { label: 'Jurídica', value: 'J' }
    ];
  }

  ngOnInit(): void {
    const doadorData = this.config.data?.event;
    console.log('Dados recebidos ao editar:', doadorData);

    if (doadorData) {
      this.isEditing = true;
      doadorData.id = doadorData.id; // Confirmação de atribuição do ID
      this.doadorService.getDoadorById(doadorData.id)
        .subscribe({
          next: (doador: GetDoadorResponse) => {
            this.populateForm(doador); // Preenche o formulário com os dados recebidos
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
  
      if (this.isEditing) {
        // Edição de um doador existente
        if (formData.id) {
          this.editDoador(formData);
        } else {
          this.handleErrorMessage('Erro ao editar: ID do doador não encontrado.');
        }
      } else {
        // Adicionar um novo doador (sem ID)
        delete formData.id;
        this.addDoador(formData);
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }
  
  
  private addDoador(formData: any): void {
    formData.tipopessoa = formData.tipopessoa === 'J' ? 'J' : 'F';  // Verifica tipo de pessoa
    console.log('Adicionando doador com os dados:', formData);  // Verificar dados antes de enviar
  
    this.doadorService.createDoador(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoadorResponse) => {
          this.handleSuccessMessage('Doador criado com sucesso!');
          this.ref.close();  // Fecha o modal após sucesso
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao criar doador!');
          console.error('Erro ao adicionar doador:', err);  // Exibe o erro completo no console
        }
      });
  }
  

  private editDoador(formData: any): void {
    if (!formData.id) {
      this.handleErrorMessage('Erro ao editar: ID do doador não encontrado.');
      return;
    }
  
    formData.tipopessoa = formData.tipopessoa === 'J' ? 'J' : 'F';  // Verifica tipo de pessoa
    console.log('Editando doador com os dados:', formData);  // Verificar dados antes de enviar
  
    this.doadorService.updateDoador(formData.id, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doador editado com sucesso!');
          this.ref.close();  // Fecha o modal após sucesso
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar doador!');
          console.error('Erro ao editar doador:', err);  // Exibe o erro completo no console
        }
      });
  }
  
  private populateForm(doador: GetDoadorResponse): void {
    const dataCadastro = doador.datacad ? new Date(doador.datacad).toISOString().split('T')[0] : '';

    this.doadorForm.patchValue({
      id: doador.id,
      nome: doador.nome,
      tipopessoa: doador.tipopessoa,
      cpf: doador.cpf,
      cnpj: doador.cnpj,
      contato1: doador.contato1,
      contato2: doador.contato2,
      cep: doador.cep,
      logradoudo: doador.logradoudo,
      numero: doador.numero,
      complemento: doador.complemento,
      bairro: doador.bairro,
      cidade: doador.cidade,
      siglaestado: doador.siglaestado,
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
    if (value && !isValidCNPJ(value.replace(/\D/g, ''))) {
      return { 'invalidCnpj': true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
