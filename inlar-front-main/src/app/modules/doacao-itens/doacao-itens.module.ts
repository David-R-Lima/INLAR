import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { DoacaoItensHomeComponent } from './page/doacao-itens-home/doacao-itens-home.component';
import { DOACAO_ITENS_ROUTES } from './doacao-itens.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoacaoItensTableComponent } from './components/doacao-itens-table/doacao-itens-table.component';
import { DoacaoItensFormComponent } from './components/doacao-itens-form/doacao-itens-form.component';

@NgModule({
  declarations: [DoacaoItensHomeComponent, DoacaoItensTableComponent, DoacaoItensFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DOACAO_ITENS_ROUTES),
    SharedModule,
    HttpClientModule,
    // PrimeNg
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [DialogService, ConfirmationService],
})
export class DoacaoItensModule { }
