import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { config, forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoacaoService } from 'src/app/services/doacao/doacao.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserDataService } from 'src/app/shared/services/usuario/usuario-data.service';
import { TipoDoacaoService } from 'src/app/services/tipo-doacao/tipo-doacao.service';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { DoadorService } from 'src/app/services/doador/doador.service';
import { DoacaoItens } from 'src/app/services/doacao-itens/doacao-itens.service';

interface Item {
  tipo: number;
  tipoLabel: string;
  quantidade?: number;
  valor?: number;
  descricao?: string;
}
interface Doador {
  label: string;
  value: number;
}

interface Beneficiario {
  label: string;
  value: number;
}

@Component({
  selector: 'app-doacao-form',
  templateUrl: './doacao-form.component.html',
  styleUrls: [],
})
export class DoacaoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public itemModalVisible: boolean = false;
  public currentItem: Item = {
    tipo: 0,
    tipoLabel: '',
    quantidade: undefined,
    valor: undefined,
    descricao: '',
  };
  public items: Item[] = [];
  public doacaoForm: FormGroup;
  public isEditing = false;
  public estados: any[];
  public DoadorOptions: Doador[] = [];
  public BeneficiarioOptions: Beneficiario[] = [];
  public tipoOptions: { label: string; value: number }[] = [];
  public selectedDoador: Doador | null = null;
  public selectedBeneficario: Doador | null = null;

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doacaoService: DoacaoService,
    private cdr: ChangeDetectorRef,
    private userDataSerive: UserDataService,
    private tipoDoacaoService: TipoDoacaoService,
    private beneficiarioService: BeneficiarioService,
    private doadorService: DoadorService
  ) {
    this.doacaoForm = this.formBuilder.group({
      idUsuario: [undefined],
      idDoacao: [undefined],
      idDoador: [undefined],
      idBeneficiario: [undefined],
      descricao: [undefined],
      cep: [undefined],
      logradouro: [undefined],
      numero: [undefined],
      complemento: [undefined],
      bairro: [undefined],
      cidade: [undefined],
      siglaestado: [undefined],
      situacao: [undefined],
      itens: [[]], // Array for items
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
      { label: 'Tocantins', value: 'TO' },
    ];
  }

  ngOnInit(): void {
    const doacaoData = this.config.data?.event;

    if (doacaoData) {
      this.isEditing = true;

      forkJoin({
        doadores: this.doadorService.getAllDoadores(),
        beneficiarios: this.beneficiarioService.getAllBeneficiarios(),
        doacao: this.doacaoService.getDoacaoById(doacaoData.id),
        doacaoItens: this.tipoDoacaoService.getTipoDoacoes(1),
      }).subscribe({
        next: ({ doadores, beneficiarios, doacao, doacaoItens }) => {
          this.DoadorOptions = doadores.map((doador) => ({
            label: doador.nome,
            value: doador.idDoador,
          }));
          this.BeneficiarioOptions = beneficiarios.map((beneficiario) => ({
            label: beneficiario.nome,
            value: beneficiario.idBeneficiario,
          }));

          this.tipoOptions = doacaoItens.map((tipo) => ({
            label: tipo.descricao ?? '',
            value: tipo.idTipoDoacao,
          }));

          const mappedItens: Item[] = doacao.doacaoItens.map((item: any) => {
            const tipoItem = doacaoItens.find(
              (tipo) => tipo.idTipoDoacao === item.idTipoDoacao
            );

            return {
              tipo: item.idTipoDoacao,
              tipoLabel: tipoItem?.descricao ?? '',
              quantidade: item.quantidade ?? undefined,
              valor: item.valor ?? undefined,
              descricao: item.descricao ?? '',
            };
          });

          this.items.push(...mappedItens);

          this.populateForm({
            ...doacao,
            itens: mappedItens,
          });
        },
      });
    } else {
      forkJoin({
        doadores: this.doadorService.getAllDoadores(),
        beneficiarios: this.beneficiarioService.getAllBeneficiarios(),
        doacaoItens: this.tipoDoacaoService.getTipoDoacoes(1),
      }).subscribe({
        next: ({ doadores, beneficiarios, doacaoItens }) => {
          this.DoadorOptions = doadores.map((doador) => ({
            label: doador.nome,
            value: doador.idDoador,
          }));
          this.BeneficiarioOptions = beneficiarios.map((beneficiario) => ({
            label: beneficiario.nome,
            value: beneficiario.idBeneficiario,
          }));

          this.tipoOptions = doacaoItens.map((tipo) => ({
            label: tipo.descricao ?? '',
            value: tipo.idTipoDoacao,
          }));
        },
      });
    }
  }

  handleSubmit(): void {
    if (this.doacaoForm.valid) {
      const userData = this.userDataSerive.getUserData(); // Fetch user data from the service

      const formData = {
        ...this.doacaoForm.value,
        idUsuario: userData?.idUsuario,
      };

      if (this.isEditing) {
        this.editDoacao({
          ...formData,
          itens: this.items,
        });
      } else {
        this.addDoacao({
          ...formData,
          itens: this.items,
        });
      }
    } else {
      this.handleErrorMessage(
        'Formulário inválido. Verifique os campos obrigatórios.'
      );
    }
  }

  private addDoacao(formData: any): void {
    this.doacaoService
      .createDoacao(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doação registrada com sucesso!');
          this.ref.close();
        },
        error: () => this.handleErrorMessage('Erro ao registrar doação!'),
      });
  }

  private editDoacao(formData: any): void {
    const payload = { ...formData, id: formData.idDoacao };
    this.doacaoService
      .updateDoacao(payload.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccessMessage('Doação editada com sucesso!');
          this.ref.close();
        },
        error: () => this.handleErrorMessage('Erro ao editar doação!'),
      });
  }

  private populateForm(doacao: any): void {
    this.doacaoForm.patchValue({
      idDoacao: doacao.idDoacao,
      idDoador: doacao.idDoador,
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
      itens: doacao.doacaoItens,
    });
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
    });
  }

  // Show modal for adding a new item
  showDialog(e: Event): void {
    e.preventDefault();
    this.itemModalVisible = true;
  }

  // Add the current item to the items array in the form
  addItem(): void {
    if (this.currentItem.tipo) {
      const item = this.tipoOptions.find(
        //@ts-expect-error sadasd
        (i) => i.value === this.currentItem.tipo.value
      );

      this.items.push({
        ...this.currentItem,
        //@ts-expect-error sadasd
        tipo: this.currentItem.tipo.value,
        tipoLabel: item?.label ?? '',
      }); // Add a copy of the current item

      // Update the form value with the new items array
      this.doacaoForm.patchValue({
        itens: this.items,
      });

      // Clear the current item fields
      this.currentItem = {
        tipo: 0,
        tipoLabel: '',
        quantidade: undefined,
        valor: undefined,
        descricao: '',
      };

      // Close the modal
      this.itemModalVisible = false;
      this.cdr.detectChanges();
    } else {
      this.handleErrorMessage('Preencha o tipo do item antes de adicionar.');
    }

    this.cdr.detectChanges();
  }

  // Remove an item from the array
  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.doacaoForm.patchValue({
      itens: this.items,
    });
  }

  getItensControls() {
    return (this.doacaoForm.get('itens') as FormArray).controls; // Return the controls of the FormArray
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
