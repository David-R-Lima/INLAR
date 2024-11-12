import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CnpjMaskDirective } from './directive/CNPJ/cnpj-mask.directive';
import { CpfMaskDirective } from './directive/CPF/cpf-mask.directive';
import { CnpjValidatorDirective } from './directive/validator/cnpj/cnpj-validator.directive';
import { CpfValidatorDirective } from './directive/validator/cpf/cpf-validator.directive';


import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { DoadorService } from './services/doador/doador.service';
import { BeneficiarioService } from './services/beneficiario/beneficiario.service';
import { TelefoneMaskDirective } from './directive/TELEFONE/telefone-mask.directive';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthInterceptor } from './services/interceptor.service';


@NgModule({
  declarations: [AppComponent, 
    HomeComponent,  
    CnpjMaskDirective,
    CpfMaskDirective,
    TelefoneMaskDirective,
    CnpjValidatorDirective,
    CpfValidatorDirective],
  imports: [
    InputMaskModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // PrimeNg
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    SelectButtonModule
  ],
  providers: [CookieService, MessageService,DoadorService,BeneficiarioService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
