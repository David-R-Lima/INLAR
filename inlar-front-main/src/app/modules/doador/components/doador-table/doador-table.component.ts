import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DoadorEvent } from 'src/app/models/enums/doador/DoadorEvent';
import { DeleteDoadorAction } from 'src/app/models/interfaces/doador/event/DeleteDoadorAction';
import { EditDoadorAction } from 'src/app/models/interfaces/doador/event/EditDoadorAction';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';

@Component({
  selector: 'app-doador-table',
  templateUrl: './doador-table.component.html',
  styleUrls: []
})
export class DoadorTableComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() public doador: Array<GetDoadorResponse> = [];
  @Output() public DoadorEvent = new EventEmitter<EditDoadorAction>();
  @Output() public deleteDoadorEvent =
    new EventEmitter<DeleteDoadorAction>();
  public doadorSelected!: GetDoadorResponse;
  public addDoadorAction = DoadorEvent.ADD_DOADOR_ACTION;
  public editDoadorAction = DoadorEvent.EDIT_DOADOR_ACTION;

  handleDeleteDoadorEvent(doador_id: string, doadorName: string): void {
    if (doador_id !== '' && doadorName !== '') {
      this.deleteDoadorEvent.emit({ doador_id, doadorName });
    }
  }

  handleDoadorEvent(
    action: string,
    id?: string,
    doadorName?: string
  ): void {
    if (action && action !== '') {
      this.DoadorEvent.emit({ action, id, doadorName });
    }
  }
}


