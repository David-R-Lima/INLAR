import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoDoacaoEvent } from 'src/app/models/enums/tipo-doacao/TipoDoacaoEvent'; 
import { DeleteTipoDoacaoAction } from 'src/app/models/interfaces/tipo-doacao/event/DeleteTipoDoacaoAction'; 
import { EditTipoDoacaoAction } from 'src/app/models/interfaces/tipo-doacao/event/EditTipoDoacaoAction'; 
import { GetTipoDoacaoResponse } from 'src/app/models/interfaces/tipo-doacao/responses/GetTipoDoacaoAction'; 

@Component({
    selector: 'app-tipo-doacao-table',
    templateUrl: './tipo-doacao-table.component.html',
    styleUrls: []
})
export class TipoDoacaoTableComponent implements OnInit {

    @Input() public tipodoacao: Array<GetTipoDoacaoResponse> = []; 
    @Output() public TipoDoacaoEvent = new EventEmitter<EditTipoDoacaoAction>(); 
    @Output() public deleteTipoDoacaoEvent = new EventEmitter<DeleteTipoDoacaoAction>(); 
    
    public tipodoacaoSelected!: GetTipoDoacaoResponse; 
    public addTipoDoacaoAction = TipoDoacaoEvent.ADD_TIPO_DOACAO_ACTION; 
    public EditTipoDoacaoAction = TipoDoacaoEvent.EDIT_TIPO_DOACAO_ACTION;
  
    ngOnInit(): void {
      // Se necessário, adicione lógica de inicialização aqui
      console.log('TipoDoacaoTableComponent initialized with', this.tipodoacao);
    }
  
    handleDeleteTipoDoacaoEvent(tipodoacao_id: string, tipodoacaoName: string): void {
      if (tipodoacao_id !== '' && tipodoacaoName !== '') {
        this.deleteTipoDoacaoEvent.emit({ tipodoacao_id, tipodoacaoName }); // Emitir evento de deletar tipo doacao
      }
    }
  
    handleTipoDoacaoEvent(action: string, id?: number, tipodoacaoName?: string): void {
      console.log('ID recebido:', id, 'Tipo:', typeof id);
      if (action && action !== '') {
        this.TipoDoacaoEvent.emit({ action, id, tipodoacaoName });
      }
    }
  }