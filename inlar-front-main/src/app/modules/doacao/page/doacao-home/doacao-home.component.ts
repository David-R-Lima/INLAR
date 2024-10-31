import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteDoacaoAction } from 'src/app/models/interfaces/doacao/event/DeleteDoacaoAction';
import { GetDoacaoResponse } from 'src/app/models/interfaces/doacao/responses/GetDoacaoAction';
import { DoacaoService } from 'src/app/services/doacao/doacao.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoacaoFormComponent } from '../../components/doacao-form/doacao-form.component';

@Component({
  selector: 'app-doacao-home',
  templateUrl: './doacao-home.component.html',
  styleUrls: []
})
export class  DoacaoHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public doacaoDatas: Array<GetDoacaoResponse> = [];
  private currentPage = 1;

  constructor(
    private DoacaoService: DoacaoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDoacao(this.currentPage);
  }

  getDoacao(page: number): void {
    this.DoacaoService.getDoacoes(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoacaoResponse[]) => {
          if (response.length > 0) {
            this.doacaoDatas = response;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar Doações!',
            life: 3000,
          });
        },
      });
  }

  handleDeleteDoacaoAction(event: DeleteDoacaoAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão da doação?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteDoacao(Number(event?.doacao_id)),
      });
    }
  }

  deleteDoacao(doacao_id: number): void {
    if (doacao_id) {
      this.DoacaoService.deleteDoacao(doacao_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.getDoacao(this.currentPage);  // Recarrega a lista após deletar
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Doação removida com sucesso!',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.getDoacao(this.currentPage);  // Recarrega a lista, mesmo em caso de erro
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover doação!',
              life: 3000,
            });
          },
        });
    }
  }

  handleDoacaoAction(event: any): void {
    console.log('Ação:', event?.action); // Verifique se a ação é "Adicionar" ou "Editar"
    console.log('Dados do event:', event); // Verifique o que está sendo passado

    const isEditing = event && event.action !== 'ADICIONAR DOACAO';
    console.log('isEditing calculado:', isEditing); // Verifique o valor calculado de isEditing

    if (event) {
      this.ref = this.dialogService.open(DoacaoFormComponent, {
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
        next: () => this.getDoacao(this.currentPage),  // Recarrega a lista após fechar o diálogo
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
