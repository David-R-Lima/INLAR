import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/DeleteBeneficiarioAction';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BeneficiarioFormComponent } from '../../components/beneficiario-form/beneficiario-form.component';

@Component({
  selector: 'app-beneficiario-home',
  templateUrl: './beneficiario-home.component.html',
  styleUrls: []
})
export class BeneficiarioHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public beneficiarioDatas: Array<GetBeneficiarioResponse> = [];
  private currentPage = 1;

  constructor(
    private beneficiarioService: BeneficiarioService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBeneficiarios(this.currentPage);
  }

  getBeneficiarios(page: number): void {
    this.beneficiarioService.getBeneficiarios(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetBeneficiarioResponse[]) => {
          if (response.length > 0) {
            this.beneficiarioDatas = response;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os Beneficiários!',
            life: 3000,
          });
        },
      });
  }

  handleDeleteBeneficiarioAction(event: DeleteBeneficiarioAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do beneficiário: ${event?.beneficiarioName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteBeneficiario(Number(event?.beneficiario_id)),
      });
    }
  }

  deleteBeneficiario(beneficiario_id: number): void {
    if (beneficiario_id) {
      this.beneficiarioService.deleteBeneficiario(beneficiario_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.getBeneficiarios(this.currentPage);  // Recarrega a lista após deletar
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Beneficiário removido com sucesso!',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.getBeneficiarios(this.currentPage);  // Recarrega a lista, mesmo em caso de erro
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover beneficiário!',
              life: 3000,
            });
          },
        });
    }
  }

  handleBeneficiarioAction(event: any): void {
    console.log('Ação:', event?.action); // Verifique se a ação é "Adicionar" ou "Editar"
    console.log('Dados do event:', event); // Verifique o que está sendo passado

    const isEditing = event && event.action !== 'ADICIONAR BENEFICIARIO';
    console.log('isEditing calculado:', isEditing); // Verifique o valor calculado de isEditing

    if (event) {
      this.ref = this.dialogService.open(BeneficiarioFormComponent, {
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
        next: () => this.getBeneficiarios(this.currentPage),  // Recarrega a lista após fechar o diálogo
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
