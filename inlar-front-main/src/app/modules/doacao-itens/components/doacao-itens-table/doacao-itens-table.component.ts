import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoacaoItensEvent } from 'src/app/models/enums/doacao-itens/DoacaoItensEvent'; 
import { DeleteDoacaoItensAction } from 'src/app/models/interfaces/doacao-itens/event/DeleteDoacaoItensAction'; 
import { EditDoacaoItensAction } from 'src/app/models/interfaces/doacao-itens/event/EditDoacaoItensAction'; 
import { GetDoacaoItensResponse } from 'src/app/models/interfaces/doacao-itens/responses/GetDoacaoItensAction';

@Component({
    selector: 'app-doacao-itens-table',
    templateUrl: './doacao-itens-table.component.html',
    styleUrls: []
})
export class DoacaoItensTableComponent implements OnInit {

    @Input() public doacaoitens: Array<GetDoacaoItensResponse> = []; 
    @Output() public DoacaoItensEvent = new EventEmitter<EditDoacaoItensAction>(); 
    @Output() public deleteDoacaoItensEvent = new EventEmitter<DeleteDoacaoItensAction>(); 

    public doacaoitensSelected!: GetDoacaoItensResponse; 
    public addDoacaoItensAction = DoacaoItensEvent.ADD_DOACAO_ITENS_ACTION; 
    public EditDoacaoItensAction = DoacaoItensEvent.EDIT_DOACAO_ITENS_ACTION;

    ngOnInit(): void {
        // Se necessário, adicione lógica de inicialização aqui
        console.log('DoacaoItensTableComponent initialized with', this.doacaoitens);
    }

    handleDeleteDoacaoItensEvent(iditemdoacao: string): void {
        if (iditemdoacao !== '') {
          this.deleteDoacaoItensEvent.emit({ iditemdoacao }); // Emitir evento de deletar tipo doacao
        }
    }
    
    handleDoacaoItensEvent(action: string, id?: number): void {
        console.log('ID recebido:', id);
        if (action && action !== '') {
          this.DoacaoItensEvent.emit({ action, id});
        }
    }


}