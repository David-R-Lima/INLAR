import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetDoacaoResponse } from 'src/app/models/interfaces/doacao/responses/GetDoacaoAction';

@Component({
    selector: 'app-doacao-form',
    templateUrl: './doacao-form.component.html',
    styleUrls: []
  })
export class DoacaoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public doacaoForm: FormGroup;
  public isEditing = false;
  
  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doacaoService: DoacaoService
  ) {
    this.doacaoForm = this.formBuilder.group({
      idDoacao: [null],
      idDoador : ['', Validators.required],
      idBeneficiario: ['', Validators.required],
      descricao: [''],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      siglaestado: ['', Validators.required],
      situacao: [''],
    });
  }

  ngOnInit(): void {
    const doacaoData = this.config.data?.event;

    if (doacaoData) {
      this.isEditing = true;
      doacaoData.idDoacao = doacaoData.id; 
      this.doacaoService.getDoadorById(doacaoData.id)
        .subscribe({
          next: (doacao: GetDoacaoResponse) => {
            this.populateForm(doacao); 
          },
          error: (err) => {
            this.handleErrorMessage('Erro ao buscar dados da doacao.');
          }
        });
    } else {
      this.isEditing = false;
      this.doacaoForm.reset();
    }
  }    
  
  handleSubmit(): void {
    if (this.doacaoForm.valid) {
      const formData = { ...this.doacaoForm.value };  
      
      if (this.isEditing) {
        this.editDoacao(formData);  
      } else {
        this.addDoacao(formData);  
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private addDoacao(formData: any): void {
    console.log('Adicionando doação com os dados:', formData);
    this.doacaoService.createDoacao(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoacaoResponse) => {
          this.handleSuccessMessage('Doação registrada com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao registrar doação!');
        }
      });
  }

  private editDoacao(formData: any): void {
    const payload = { ...formData, id: formData.idDoacao };
    this.doacaoService.updateDoacao(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doação editada com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar doação!');
        }
      });
  }

  private populateForm(doacao: GetDoacaoResponse): void {
    this.doacaoForm.patchValue({
      idDoacao: doacao.idDoacao,
      idDoador : doacao.idDoador,
      idBeneficiario: doacao.idBeneficiario,
      descricao: doacao.descricao,
      cep: doacao.cep,
      logradouro: doacao.logradouro,
      numero: doacao.numero,
      complemento: doacao.complemento,
      bairro: doacao.bairro,
      cidade: doacao.cidade,
      siglaestado: doacao.siglaestado,
      situacao: doacao.situacao,
    });

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