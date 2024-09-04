import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { isValid as isValidCNPJ } from '@fnando/cnpj';
import { isValid as isValidCPF } from '@fnando/cpf';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: []
})
export class BeneficiarioFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public beneficiarioForm: FormGroup;
  public isEditing = false;
  public estados: any[];
  public tiposPessoa: any[];
  public generos: any[];

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService,
    private empresaService: EmpresaService
  ) {
    this.beneficiarioForm = this.formBuilder.group({
      idBeneficiario: [null], 
      nome: ['', Validators.required],
      tipo_pessoa: ['F', Validators.required], 
      cpf: ['', this.cpfValidator],
      rg: [''],
      genero: ['', Validators.required],
      data_nascimento: [''], 
      cnpj: ['', this.cnpjValidator],
      razao_social: [''], 
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
      { label: 'Pessoa Física', value: 'F' },
      { label: 'Pessoa Jurídica', value: 'J' }
    ];

    this.generos = [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' }
    ];
  }

  ngOnInit(): void {
    const beneficiarioData = this.config.data?.event;
    console.log('Dados recebidos ao editar:', beneficiarioData);

    if (beneficiarioData) {
      this.isEditing = true;
      beneficiarioData.idBeneficiario = beneficiarioData.id; // Copia o valor de 'id' para 'idBeneficiario'
    console.log('beneficiarioData ajustado:', beneficiarioData);
      console.log('isEditing set to true'); 
     
      this.beneficiarioService.getBeneficiarioById(beneficiarioData.id)
      .subscribe({
          next: (beneficiario: GetBeneficiarioResponse) => {
              console.log('Dados completos do beneficiário:', beneficiario);
              this.populateForm(beneficiario); // Preencha o formulário com os dados completos
          },
          error: (err) => {
              console.error('Erro ao buscar dados do beneficiário:', err);
              this.handleErrorMessage('Erro ao buscar dados do beneficiário.');
          }
      });

    } else {
      console.log('Adicionando novo beneficiário');
      this.isEditing = false;
      console.log('isEditing set to false'); // Verifique se o valor é resetado
      this.beneficiarioForm.reset();
    }
  }
  

  handleSubmit(): void {
    console.log('Formulário enviado:', this.beneficiarioForm.value);
  
    if (this.beneficiarioForm.valid) {
      const formData = this.beneficiarioForm.value;
  
      if (formData.tipo_pessoa === 'J') {
       
        if (this.isEditing) {
          console.log('Editando empresa'); 
          this.editEmpresa(formData);
        } else {
          console.log('Adicionando nova empresa'); 
          this.addEmpresa(formData);
        }
      } else {
        
        if (this.isEditing) {
          console.log('Editando beneficiário'); 
          this.editBeneficiario(formData);
        } else {
          console.log('Adicionando novo beneficiário'); // Verifique se ele entra no modo de criação para beneficiários
          this.addBeneficiario(formData);
        }
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }
  
  private addBeneficiario(formData: any): void {
    console.log('Dados enviados ao backend:', formData); // Verificar o payload completo

    if (formData.tipo_pessoa === 'F') {
      formData.cnpj = ''; 
    }
    
    this.beneficiarioService.createBeneficiario(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetBeneficiarioResponse) => {
          console.log('Beneficiário criado:', response);
          this.handleSuccessMessage('Beneficiário criado com sucesso!');
          this.ref.close(); 
        },
        error: (err) => {
          console.error('Erro ao criar beneficiário:', err);
          this.handleErrorMessage('Erro ao criar beneficiário!');
        }
      });
  }

  private editBeneficiario(formData: any): void {
    const payload = { ...formData, id: formData.idBeneficiario }; 
    console.log('ID do Beneficiário:', payload.id);
    if (!payload.id) {
      this.handleErrorMessage('ID do beneficiário não encontrado.');
      return;
    }
  
    this.beneficiarioService.updateBeneficiario(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Beneficiário editado com sucesso!');
          this.ref.close(); 
        },
        error: (err) => {
          console.error('Erro ao editar beneficiário:', err);
          this.handleErrorMessage('Erro ao editar beneficiário!');
        }
      });
  }

  private addEmpresa(formData: any): void {
    this.empresaService.createEmpresa(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Empresa criada:', response);
          this.handleSuccessMessage('Empresa criada com sucesso!');
          this.ref.close(); 
        },
        error: (err) => {
          console.error('Erro ao criar empresa:', err);
          this.handleErrorMessage('Erro ao criar empresa!');
        }
      });
  }
  
  private editEmpresa(formData: any): void {
    this.empresaService.updateEmpresa(formData.idBeneficiario, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Empresa editada com sucesso!');
          this.ref.close(); 
        },
        error: (err) => {
          console.error('Erro ao editar empresa:', err);
          this.handleErrorMessage('Erro ao editar empresa!');
        }
      });
  }
  

  private populateForm(beneficiario: GetBeneficiarioResponse): void {
    console.log('Beneficiário recebido no populateForm:', beneficiario);

    const dataNascimento = beneficiario.dataNascimento 
        ? new Date(beneficiario.dataNascimento).toISOString().split('T')[0] 
        : '';

    console.log('Data de Nascimento formatada:', dataNascimento);

    this.beneficiarioForm.patchValue({
        idBeneficiario: beneficiario.idBeneficiario,  
        nome: beneficiario.nome,
        tipo_pessoa: beneficiario.tipoPessoa,
        cpf: beneficiario.cpf,
        rg: beneficiario.rg,
        genero: beneficiario.genero,
        data_nascimento: dataNascimento,
        cnpj: beneficiario.cnpj,
        razao_social: beneficiario.razaoSocial,
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

    // Este é o log que verifica o valor do campo após o patchValue
    console.log('Valor de data_nascimento no formulário após patchValue:', this.beneficiarioForm.get('data_nascimento')?.value);
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
