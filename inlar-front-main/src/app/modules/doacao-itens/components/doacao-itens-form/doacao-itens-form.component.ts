import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetDoacaoItensResponse } from 'src/app/models/interfaces/doacao-itens/responses/GetDoacaoItensAction';
import { DoacaoItensService } from 'src/app/services/doacao-itens/doacao-itens.service';

@Component({
  selector: 'app-doacao-itens-form',
  templateUrl: './doacao-itens-form.component.html',
  styleUrls: []
})
export class DoacaoItensFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  
  public doacaoitensForm: FormGroup;
  public isEditing = false;

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doacaoitensService: DoacaoItensService
  ) {
    this.doacaoitensForm = this.formBuilder.group({
      iditemdoacao: [null],
      iddoacao : ['', Validators.required],
      idtipodoacao: ['', Validators.required],
      numitem: [''],
      descricao: [''],
      qtde: [''],
      valormonetario: [''],
    });
  }

  ngOnInit(): void {
      return
  }    
    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private addDoacaoitens(formData: any): void {
    console.log('Adicionando itens com os dados:', formData);
    this.doacaoitensService.createDoacao(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoacaoItensResponse) => {
          this.handleSuccessMessage('Itens de doação registrados com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao registrar itens de doação!');
        }
      });
  }
  handleSubmit(): void {
    if (this.doacaoitensForm.valid) {
      const formData = { ...this.doacaoitensForm.value };  
      
      if (this.isEditing) {
        this.editDoacaoitens(formData);  
      } else {
        this.addDoacaoitens(formData);  
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }
  private editDoacaoitens(formData: any): void {
    const payload = { ...formData, id: formData.idDoacaoitens };
    this.doacaoitensService.updateDoacao(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Itens de doação editados com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar itens de doação!');
        }
      });
  } 
  
  private populateForm(doacaoitens: GetDoacaoItensResponse): void {
    this.doacaoitensForm.patchValue({
      iditemdoacao: doacaoitens.iditemdoacao,
      iddoacao: doacaoitens.iddoacao,
      idtipodoacao: doacaoitens.idtipodoacao,
      numitem: doacaoitens.numitem,
      descricao: doacaoitens.descricao,
      qtde: doacaoitens.qtde,
      valormonetario: doacaoitens.valormonetario
    });
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }
      
}    