import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoadorEvent } from 'src/app/models/enums/doador/DoadorEvent'; // Ajuste para o enum de Doador
import { DeleteDoadorAction } from 'src/app/models/interfaces/doador/event/DeleteDoadorAction'; // Ajuste para a interface de deletar Doador
import { EditDoadorAction } from 'src/app/models/interfaces/doador/event/EditDoadorAction'; // Ajuste para a interface de editar Doador
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse'; // Ajuste para a resposta do Doador

@Component({
  selector: 'app-doador-table',
  templateUrl: './doador-table.component.html',
  styleUrls: []
})
export class DoadorTableComponent implements OnInit {

  @Input() public doadores: Array<GetDoadorResponse> = []; // Variável de input para os doadores
  @Output() public DoadorEvent = new EventEmitter<EditDoadorAction>(); // Emissor para eventos de edição de doador
  @Output() public deleteDoadorEvent = new EventEmitter<DeleteDoadorAction>(); // Emissor para eventos de deleção de doador

  public doadorSelected!: GetDoadorResponse; // Doador selecionado
  public addDoadorAction = DoadorEvent.ADD_DOADOR_ACTION; // Ação para adicionar doador
  public EditDoadorAction = DoadorEvent.EDIT_DOADOR_ACTION; // Ação para editar doador

  ngOnInit(): void {
    // Se necessário, adicione lógica de inicialização aqui
    console.log('DoadorTableComponent initialized with', this.doadores);
  }

  handleDeleteDoadorEvent(doador_id: string, doadorName: string): void {
    if (doador_id !== '' && doadorName !== '') {
      this.deleteDoadorEvent.emit({ doador_id, doadorName }); // Emitir evento de deletar doador
    }
  }

  handleDoadorEvent(action: string, id?: number, doadorName?: string): void {
    console.log('ID recebido:', id, 'Tipo:', typeof id);
    if (action && action !== '') {
      // Converter id para string antes de emitir, se id existir
      this.DoadorEvent.emit({ action, id: id?.toString(), doadorName });
    }
  }
}
