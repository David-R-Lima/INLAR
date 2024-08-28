// src/app/services/doador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';

export interface Doador {
  id: number;
  nome: string;
  tipopessoa?: string;  // varchar(1) (optional)
  cpf?: string;  // varchar(11) (optional)
  cnpj?: string;  // varchar(14) (optional)
  contato1?: string;  // varchar(11) (optional)
  contato2?: string;  // varchar(11) (optional)
  cep?: string;  // varchar(8) (optional)
  logradoudo?: string;  // varchar(255) (optional)
  numero?: string;  // varchar(10) (optional)
  complemento?: string;  // varchar(100) (optional)
  bairro?: string;  // varchar(100) (optional)
  cidade?: string;  // varchar(100) (optional)
  siglaestado?: string;  // varchar(2) (optional)
  observacoes?: string;  // text (optional)
  datacad?: string;  // datetime (optional)
  ativo?: string;  // varchar(1) (optional)
}

@Injectable({
  providedIn: 'root'
})
export class DoadorService {
  private apiUrl = 'http://localhost:3256'; // URL do backend

  constructor(private http: HttpClient) {}

  getDoadores(): Observable<GetDoadorResponse[]> {
    return this.http.get<GetDoadorResponse[]>(`${this.apiUrl}/doadores`);
  }

  getDoadorById(id: number): Observable<GetDoadorResponse> {
    return this.http.get<GetDoadorResponse>(`${this.apiUrl}/doadores/${id}`);
  }

  createDoador(doador: Doador): Observable<GetDoadorResponse> {
    return this.http.post<GetDoadorResponse>(`${this.apiUrl}/doadores`, doador);
  }

  updateDoador(id: number, doador: Doador): Observable<GetDoadorResponse> {
    return this.http.put<GetDoadorResponse>(`${this.apiUrl}/doadores/${id}`, doador);
  }

  deleteDoador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doadores/${id}`);
  }
}
