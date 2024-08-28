import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoadorService, Doador } from 'src/app/services/doador/doador.service';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';

@Component({
  selector: 'app-doador-form',
  templateUrl: './doador-form.component.html',
  styleUrls: []
})
export class DoadorFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public doadorForm: FormGroup;
  public isEditing = false; 
  private doadorId?: number;

  public estados: any[]; 
  public tiposPessoa: any[];
  public generos: any[];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doadorService: DoadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doadorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoPessoa: ['F', Validators.required],
      cpf: [''],
      rg: [''],
      genero: [''],
      dataNascimento: [''],
      cnpj: [''],
      razaoSocial: [''],
      contato1: ['', Validators.required],
      contato2: [''],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      siglaEstado: ['', Validators.required],
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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doadorId = +id;
        this.isEditing = true;
        this.loadDoador(this.doadorId);
      }
    });
  }

  handleSubmit(): void {
    if (this.doadorForm.valid) {
      const formData = this.doadorForm.value;

      if (this.isEditing && this.doadorId !== undefined) {
        this.updateDoador(this.doadorId, formData);
      } else {
        this.createDoador(formData);
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private createDoador(formData: Doador): void {
    this.doadorService.createDoador(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doador criado com sucesso!');
          this.router.navigate(['/doador-table']);
        },
        error: () => {
          this.handleErrorMessage('Erro ao criar doador!');
        }
      });
  }

  private updateDoador(id: number, formData: Doador): void {
    this.doadorService.updateDoador(id, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doador editado com sucesso!');
          this.router.navigate(['/doador-table']);
        },
        error: () => {
          this.handleErrorMessage('Erro ao editar doador!');
        }
      });
  }

  private loadDoador(id: number): void {
    this.doadorService.getDoadorById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (doadorResponse: GetDoadorResponse) => {
          const doador: Doador = {
            ...doadorResponse,
            ativo: doadorResponse.ativo ? 'true' : 'false'  // Converter boolean para string se necessário
          };
          this.populateForm(doador);
        },
        error: () => this.handleErrorMessage('Erro ao carregar doador!')
      });
  }
  

  private populateForm(doador: Doador): void {
    this.doadorForm.patchValue(doador);
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
