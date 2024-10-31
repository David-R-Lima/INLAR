import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteTipoDoacaoAction } from 'src/app/models/interfaces/tipo-doacao/event/DeleteTipoDoacaoAction';
import { GetTipoDoacaoResponse } from 'src/app/models/interfaces/tipo-doacao/responses/GetTipoDoacaoAction';
import { TipoDoacaoService } from 'src/app/services/tipo-doacao/tipo-doacao.service';
import { TipoDoacaoFormComponent } from '../../components/tipo-doacao-form/tipo-doacao-form.component';

@Component({
  selector: 'app-tipo-doacao-home',
  templateUrl: './tipo-doacao-home.component.html',
  styleUrls: []
})
export class TipoDoacaoHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public tipodoacaoDatas: Array<GetTipoDoacaoResponse> = [];

  constructor(
    private tipodoacaoService: TipoDoacaoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTipoDoacao();
  }

  getTipoDoacao() {
    this.tipodoacaoService.getTipoDoacoes(1)  
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetTipoDoacaoResponse[]) => {
          if (response.length > 0) {
            this.tipodoacaoDatas = response;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os tipo doacao!',
            life: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleDeleteTipoDoacaoAction(event: DeleteTipoDoacaoAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do Tipo Doacao: ${event?.tipodoacaoName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteTipoDoacao(Number(event?.tipodoacao_id)),
      });
    }
  }

  deleteTipoDoacao(tipodoacao_id: number): void {
    if (tipodoacao_id) {
      this.tipodoacaoService.deleteTipoDoacao(tipodoacao_id)  // Passe apenas o ID diretamente
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.getTipoDoacao();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Tipo doação removido com sucesso!',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.getTipoDoacao();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover tipo doação!',
              life: 3000,
            });
          },
        });
    }
  }

  handleTipoDoacaoAction(event: any): void {
    const isEditing = event && event.action !== 'ADICIONAR Tipo Doacao';
    if (event) {
      this.ref = this.dialogService.open(TipoDoacaoFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: isEditing ? event : null,
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getTipoDoacao(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
