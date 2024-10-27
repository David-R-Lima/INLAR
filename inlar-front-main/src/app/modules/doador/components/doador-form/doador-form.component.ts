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

  public tipoPessoaOptions = [
    { label: 'Pessoa Física', value: 'F' },
    { label: 'Pessoa Jurídica', value: 'J' }
  ];

  public doadorForm: FormGroup;
  public isEditing = false;
  public estados: any[];

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doadorService: DoadorService
  ) {
    this.doadorForm = this.formBuilder.group({
      idDoador: [null],
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

   
    this.doadorForm.get('tipo_pessoa')?.valueChanges.subscribe(tipo => {
      if (tipo === 'F') {
        
        this.doadorForm.get('cpf')?.setValidators([Validators.required, this.cpfValidator]);
    
        
        this.doadorForm.get('cnpj')?.clearValidators();
      } else if (tipo === 'J') {
        
        this.doadorForm.get('cnpj')?.setValidators([Validators.required, this.cnpjValidator]);

       
        this.doadorForm.get('cpf')?.clearValidators();
      }
      
      this.doadorForm.get('cpf')?.updateValueAndValidity();
      this.doadorForm.get('cnpj')?.updateValueAndValidity();
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
