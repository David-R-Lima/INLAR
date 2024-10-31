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
    @Output() public deleteDoadorEvent = new EventEmitter<DeleteDoacaoAction>(); 
    
    public doacaoSelected!: GetDoacaoResponse; 
    public addDoacaoAction = DoacaoEvent.ADD_DOACAO_ACTION; 
    public EditDoacaoAction = DoacaoEvent.EDIT_DOACAO_ACTION;
  
    ngOnInit(): void {
      // Se necessário, adicione lógica de inicialização aqui
      console.log('DoacaoTableComponent initialized with', this.doacao);
    }
  
    handleDeleteDoadorEvent(doacao_id: string, doacaoName: string): void {
      if (doacao_id !== '' && doacaoName !== '') {
        this.deleteDoadorEvent.emit({ doacao_id, doacaoName }); // Emitir evento de deletar doador
      }
    }
  
    handleDoacaoEvent(action: string, id?: number, doacaoName?: string): void {
      console.log('ID recebido:', id, 'Tipo:', typeof id);
      if (action && action !== '') {
        this.DoacaoEvent.emit({ action, id, doacaoName });
      }
    }
  }