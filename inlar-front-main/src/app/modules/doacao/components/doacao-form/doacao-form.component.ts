import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { config, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoacaoService } from 'src/app/services/doacao/doacao.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserDataService } from 'src/app/shared/services/usuario/usuario-data.service';
import { TipoDoacaoService } from 'src/app/services/tipo-doacao/tipo-doacao.service';

interface Item {
  tipo: string;
  quantidade?: number;
  valor?: number;
  descricao?: string;
}
interface Doador {
  nome: string;
}

interface Beneficiario {
  nome: string;
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
    tipo: '',
    quantidade: undefined,
    valor: undefined,
    descricao: '',
  };
  public items: Item[] = [];
  public doacaoForm: FormGroup;
  public isEditing = false;
  public estados: any[];
  public DoadorOptions: Doador[] = [{ nome: '' }];
  public BeneficiarioOptions: Beneficiario[] = [{ nome: '' }];
  public tipoOptions: { label: string; value: string }[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doacaoService: DoacaoService,
    private cdr: ChangeDetectorRef,
    private userDataSerive: UserDataService,
    private tipoDoacaoService: TipoDoacaoService
  ) {
    this.doacaoForm = this.formBuilder.group({
      id_usuario: [undefined],
      idDoacao: [[]],
      idDoador: [[]],
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
      this.doacaoService.getDoacaoById(doacaoData.id).subscribe({
        next: (doacao) => this.populateForm(doacao),
        error: () => this.handleErrorMessage('Erro ao buscar dados da doacao.'),
      });
    }

    this.tipoDoacaoService
      .getTipoDoacoes(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tipoDoacoes: any[]) => {
          // Mapear os dados para o formato esperado
          this.tipoOptions = tipoDoacoes.map((tipo) => ({
            label: tipo.descricao, // Campo da descrição
            value: tipo.idTipoDoacao, // Campo do ID
          }));
        },
        error: () => this.handleErrorMessage('Erro ao buscar tipos de doação.'),
      });
  }

  handleSubmit(): void {
    if (this.doacaoForm.valid) {
      const userData = this.userDataSerive.getUserData(); // Fetch user data from the service

      const formData = {
        ...this.doacaoForm.value,
        id_usuario: userData?.idUsuario,
      };

      if (this.isEditing) {
        this.editDoacao(formData);
      } else {
        this.addDoacao(formData);
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
      this.items.push({
        ...this.currentItem,
        tipo: this.currentItem.tipo,
      }); // Add a copy of the current item

      // Update the form value with the new items array
      this.doacaoForm.patchValue({
        itens: this.items,
      });

      // Clear the current item fields
      this.currentItem = {
        tipo: '',
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
