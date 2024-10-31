import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { isValid as isValidCPF } from '@fnando/cpf';
import { isValid as isValidCNPJ } from '@fnando/cnpj';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: []
})
export class BeneficiarioFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public tipoPessoaOptions = [
    { label: 'Pessoa Física', value: 'F' },
    { label: 'Pessoa Jurídica', value: 'J' }
  ];

  public beneficiarioForm: FormGroup;
  public isEditing = false;
  public estados: any[];
  public generos: any[];



  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService
  ) {
    this.beneficiarioForm = this.formBuilder.group({
      idBeneficiario: [null],
      nome: ['', Validators.required],
      tipo_pessoa: ['F', Validators.required],
      cpf: ['', this.cpfValidator],
      cnpj: ['', this.cnpjValidator], 
      rg: [''],
      genero: ['', Validators.required],
      datanasc: ['', Validators.required],
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

    this.beneficiarioForm.get('tipo_pessoa')?.valueChanges.subscribe(tipo => {
      if (tipo === 'F') {
        this.beneficiarioForm.get('cpf')?.setValidators([Validators.required, this.cpfValidator]);
        
        this.beneficiarioForm.get('cnpj')?.clearValidators();
        this.beneficiarioForm.get('cnpj')?.setValue(''); 
      } else if (tipo === 'J') {
        this.beneficiarioForm.get('cnpj')?.setValidators([Validators.required, this.cnpjValidator]);
        
        this.beneficiarioForm.get('cpf')?.clearValidators();
        this.beneficiarioForm.get('cpf')?.setValue(''); 
      }
      this.beneficiarioForm.get('cpf')?.updateValueAndValidity();
      this.beneficiarioForm.get('cnpj')?.updateValueAndValidity();
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

    this.generos = [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' },
      { label: 'Outro', value: 'Outro' },
      { label: 'Prefiro não informar', value: 'Prefiro não informar' }
    ];
  }

  ngOnInit(): void {
    const beneficiarioData = this.config.data?.event;
    console.log('Dados recebidos ao editar:', beneficiarioData);

    if (beneficiarioData) {
      this.isEditing = true;
      beneficiarioData.idBeneficiario = beneficiarioData.id; // Copia o valor de 'id' para 'idBeneficiario'
      this.beneficiarioService.getBeneficiarioById(beneficiarioData.id)
        .subscribe({
          next: (beneficiario: GetBeneficiarioResponse) => {
            this.populateForm({
              ...beneficiario,
              dataNascimento: beneficiario.dataNascimento ? dayjs(new Date(beneficiario.dataNascimento)).utc().format("YYYY-MM-DD") : undefined
            }); // Preenche o formulário com os dados recebidos
          },
          error: (err) => {
            this.handleErrorMessage('Erro ao buscar dados do beneficiário.');
          }
        });
    } else {
      this.isEditing = false;
      this.beneficiarioForm.reset();
    }
  }

  handleSubmit(): void {
    if (this.beneficiarioForm.valid) {
      const formData = { ...this.beneficiarioForm.value }; // Faz uma cópia do formulário
  
      if (formData.datanasc) {
        const dateString = formData.datanasc;
        formData.datanasc = new Date(dateString).toISOString();  // Converte a string para formato ISO
      }

      // Remove a formatação do CPF e CNPJ
      if (formData.tipo_pessoa === 'F' && formData.cpf) {
        formData.cpf = formData.cpf.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
        formData.cnpj = '';  // Limpa o CNPJ para Pessoa Física
      }
      if (formData.tipo_pessoa === 'J' && formData.cnpj) {
        formData.cnpj = formData.cnpj.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
        formData.cpf = '';  // Limpa o CPF para Pessoa Jurídica
      }
  
      // Remove a formatação dos números de telefone (Contato 1 e Contato 2)
      if (formData.contato1) {
        formData.contato1 = formData.contato1.replace(/\D/g, '');  // Remove os caracteres não numéricos
      }
      if (formData.contato2) {
        formData.contato2 = formData.contato2.replace(/\D/g, '');  // Remove os caracteres não numéricos
      }
  
      // Verifica se está editando ou adicionando
      if (this.isEditing) {
        this.editBeneficiario(formData);  // Chama o método de edição
      } else {
        this.addBeneficiario(formData);  // Chama o método de adição
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }
  
  

  private addBeneficiario(formData: any): void {
    console.log('Adicionando beneficiário com os dados:', formData); 
    this.beneficiarioService.createBeneficiario(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetBeneficiarioResponse) => {
          this.handleSuccessMessage('Beneficiário criado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao criar beneficiário!');
        }
      });
  }

  private editBeneficiario(formData: any): void {
    const payload = { ...formData, id: formData.idBeneficiario };
    this.beneficiarioService.updateBeneficiario(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Beneficiário editado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar beneficiário!');
        }
      });
  }

  private populateForm(beneficiario: GetBeneficiarioResponse): void {
    

    this.beneficiarioForm.patchValue({
      idBeneficiario: beneficiario.idBeneficiario,
      nome: beneficiario.nome,
      tipo_pessoa: beneficiario.tipoPessoa,
      cpf: beneficiario.cpf,
      cnpj: beneficiario.cnpj,
      rg: beneficiario.rg,
      genero: beneficiario.genero,
      datanasc: beneficiario.dataNascimento,
      contato1: beneficiario.contato1,
      contato2: beneficiario.contato2,
      cep: beneficiario.cep,
      logradouro: beneficiario.logradouro,
      numero: beneficiario.numero,
      complemento: beneficiario.complemento,
      bairro: beneficiario.bairro,
      cidade: beneficiario.cidade,
      uf: beneficiario.uf,
      observacoes: beneficiario.observacoes,
      ativo: beneficiario.ativo
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
