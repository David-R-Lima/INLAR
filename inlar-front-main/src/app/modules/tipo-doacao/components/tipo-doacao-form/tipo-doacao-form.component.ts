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
      this.tipodoacaoService.getTipoDoacaoById(tipodoacaoData.id)
        .subscribe({
          next: (tipodoacao: GetTipoDoacaoResponse) => {
            this.populateForm(tipodoacao); 
          },
          error: (err) => {
            this.handleErrorMessage('Erro ao buscar dados do tipo doacao.');
          }
        });
    } else {
      this.isEditing = false;
      this.tipodoacaoForm.reset();
    }
  }



  private addTipoDoacao(formData: any): void {
    console.log('Adicionando tipo doacao com os dados:', formData);
    this.tipodoacaoService.createTipoDoacao(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetTipoDoacaoResponse) => {
          this.handleSuccessMessage('Tipo doacao criado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao criar tipo doacao!');
        }
      });
  }

  private editTipoDoacao(formData: any): void {
    const payload = { ...formData, id: formData.idTipoDoacao };
    this.tipodoacaoService.updateTipoDoacao(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Tipo doacao editado com sucesso!');
          this.ref.close();
        },
        error: (err) => {
          this.handleErrorMessage('Erro ao editar tipo doacao!');
        }
      });
  }

  private populateForm(tipodoacao: GetTipoDoacaoResponse): void {
    this.tipodoacaoForm.patchValue({
      idTipoDoacao: tipodoacao.idTipoDoacao,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
