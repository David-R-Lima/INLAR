import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { config, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoacaoService } from 'src/app/services/doacao/doacao.service';
import { ChangeDetectorRef } from '@angular/core';

interface Item {
  tipo: string;
  quantidade?: number;
  valor?: number;
  descricao?: string;
}

@Component({
  selector: 'app-doacao-form',
  templateUrl: './doacao-form.component.html',
  styleUrls: []
})
export class DoacaoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public itemModalVisible: boolean = false;
  public currentItem: Item = { tipo: '', quantidade: undefined, valor: undefined, descricao: '' };
  public items: Item[] = [];
  public doacaoForm: FormGroup;
  public isEditing = false;
  public estados: any[];

  public DoadorOptions = [
    { label: 'Doador 1', value: 'd1' },
    { label: 'Doador 2', value: 'd2' }
  ];

  public BeneficiarioOptions = [
    { label: 'Beneficiario 1', value: 'b1' },
    { label: 'Beneficiario 2', value: 'b2' }
  ];

  public tipoOptions = [
    { label: 'Comida', value: '1' },
    { label: "Dinheiro", value: '2'}
  ]

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doacaoService: DoacaoService,
    private cdr: ChangeDetectorRef,
  ) {

    this.doacaoForm = this.formBuilder.group({
      id_usuario: [1],
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
      itens: [[]] // Array for items
    })

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

  }

  ngOnInit(): void {
    const doacaoData = this.config.data?.event;
    // this.userDataSerive.getUserData()

    if (doacaoData) {
      this.isEditing = true;
      this.doacaoService.getDoacaoById(doacaoData.id).subscribe({
        next: (doacao) => this.populateForm(doacao),
        error: () => this.handleErrorMessage('Erro ao buscar dados da doacao.')
      });
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
    console.log(formData)
    this.doacaoService.createDoacao(formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.handleSuccessMessage('Doação registrada com sucesso!');
        this.ref.close();
      },
      error: () => this.handleErrorMessage('Erro ao registrar doação!')
    });
  }

  private editDoacao(formData: any): void {
    const payload = { ...formData, id: formData.idDoacao };
    this.doacaoService.updateDoacao(payload.id, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.handleSuccessMessage('Doação editada com sucesso!');
        this.ref.close();
      },
      error: () => this.handleErrorMessage('Erro ao editar doação!')
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
      situacao: doacao.situacao
    });
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }

  // Show modal for adding a new item
  showDialog(e: Event): void {
    e.preventDefault()
    this.itemModalVisible = true;
  }

  // Add the current item to the items array in the form
  addItem(): void {
    if (this.currentItem.tipo) {
      //@ts-expect-error dps concerto
      this.items.push({ ...this.currentItem, tipo: this.currentItem.tipo.value }); // Add a copy of the current item

      // Update the form value with the new items array
      this.doacaoForm.patchValue({
        itens: this.items
      });

      // Clear the current item fields
      this.currentItem = { tipo: '', quantidade: undefined, valor: undefined, descricao: '' };
      
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
      itens: this.items
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
