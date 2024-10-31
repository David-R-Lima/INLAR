import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TipoDoacaoService } from 'src/app/services/tipo-doacao/tipo-doacao.service';
import { GetTipoDoacaoResponse } from 'src/app/models/interfaces/tipo-doacao/responses/GetTipoDoacaoResponse';

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
      descricao: [''],
      ativo: [true]
    });

   

    ngOnInit(): void {
        const tipodoacaoData = this.config.data?.event;
    
        if (tipodoacaoData) {
          this.isEditing = true;
          tipodoacaoData.idTipoDoacao = tipodoacaoData.id; 
          this.tipodoacaoService.getDoadorById(tipodoacaoData.id)
            .subscribe({
              next: (tipodoacao: GetTipoDoacaoResponse) => {
                this.populateForm(tipodoacao); 
              },
              error: (err) => {
                this.handleErrorMessage('Erro ao buscar dados da doacao.');
              }
            });
        } else {
          this.isEditing = false;
          this.tipodoacaoForm.reset();
        }
      }    
      
      handleSubmit(): void {
        if (this.tipodoacaoForm.valid) {
          const formData = { ...this.tipodoacaoForm.value };  
          
          if (this.isEditing) {
            this.editTipoDoacao(formData);  
          } else {
            this.addTipoDoacao(formData);  
          }
        } else {
          this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
        }
      }
    
      private addTipoDoacao(formData: any): void {
        console.log('Adicionando doação com os dados:', formData);
        this.tipodoacaoService.createTipoDoacao(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response: GetTipoDoacaoResponse) => {
              this.handleSuccessMessage('Tipo doação registrada com sucesso!');
              this.ref.close();
            },
            error: (err) => {
              this.handleErrorMessage('Erro ao registrar tipo doação!');
            }
          });
      }
    
      private editTipoDoacao(formData: any): void {
        const payload = { ...formData, id: formData.idDoacao };
        this.tipodoacaoService.updateTipoDoacao(payload.id, payload)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.handleSuccessMessage('Tipo doação editada com sucesso!');
              this.ref.close();
            },
            error: (err) => {
              this.handleErrorMessage('Erro ao editar tipo doação!');
            }
          });
      }
    

  private populateForm(tipodoacao: GetTipoDoacaoResponse): void {
    this.tipodoacaoForm.patchValue({
      idTipoDoacao: tipodoacao.idTipoDoacao,
      descricao: tipodoacao.descricao,
      ativo: tipodoacao.ativo
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