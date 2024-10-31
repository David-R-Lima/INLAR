import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoacaoEvent } from 'src/app/models/enums/doacao/DoacaoEvent'; 
import { DeleteDoacaoAction } from 'src/app/models/interfaces/doacao/event/DeleteDoacaoAction'; 
import { EditDoacaoAction } from 'src/app/models/interfaces/doacao/event/EditDoacaoAction'; 
import { GetDoacaoResponse } from 'src/app/models/interfaces/doacao/responses/GetDoacaoAction'; 

@Component({
    selector: 'app-doacao-table',
    templateUrl: './doacao-table.component.html',
    styleUrls: []
})
export class DoacaoTableComponent implements OnInit {

    @Input() public doacao: Array<GetDoacaoResponse> = []; 
    @Output() public DoacaoEvent = new EventEmitter<EditDoacaoAction>(); 
    @Output() public deleteDoacaoEvent = new EventEmitter<DeleteDoacaoAction>(); 
    
    public doacaoSelected!: GetDoacaoResponse; 
    public addDoacaoAction = DoacaoEvent.ADD_DOACAO_ACTION; 
    public EditDoacaoAction = DoacaoEvent.EDIT_DOACAO_ACTION;
  
    ngOnInit(): void {
      // Se necessário, adicione lógica de inicialização aqui
      console.log('DoacaoTableComponent initialized with', this.doacao);
    }
  
    handleDeleteDoacaoEvent(doacao_id: string): void {
      if (doacao_id !== '') {
        this.deleteDoacaoEvent.emit({doacao_id}); // Emitir evento de deletar doador
      }
    }
  
    handleDoacaoEvent(action: string, id?: number, doacaoName?: string, data?: Date): void {
      console.log('ID recebido:', id, 'Tipo:', typeof id, 'Data: ', typeof data);
      if (action && action !== '') {
        this.DoacaoEvent.emit({ action, id, doacaoName });
      }
    }
  }