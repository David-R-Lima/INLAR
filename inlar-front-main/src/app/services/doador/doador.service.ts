import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';
import { environment } from 'src/environments/environment';

export interface Doador {
  idDoador?: number;
  nome: string;
  tipopessoa?: string;
  cpf?: string;
  cnpj?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?: string;
  observacoes?: string;
  datacad?: string;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DoadorService {
  private apiUrl = environment.API_URL;; // URL do seu backend

  constructor(private http: HttpClient) {}

  getDoadores(page: number): Observable<GetDoadorResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetDoadorResponse[]>(`${this.apiUrl}/doador`, { params });
  }

  getDoadorById(idDoador: number): Observable<GetDoadorResponse> {
    return this.http.get<GetDoadorResponse>(`${this.apiUrl}/doador/${idDoador}`);
  }

  createDoador(doador: Doador): Observable<GetDoadorResponse> {
    return this.http.post<GetDoadorResponse>(`${this.apiUrl}/doador`, doador);
  }

  updateDoador(idDoador: number, doador: Doador): Observable<GetDoadorResponse> {
    return this.http.put<GetDoadorResponse>(`${this.apiUrl}/doador/${idDoador}`, doador);
  }

  deleteDoador(idDoador: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doador/${idDoador}`);
  }
}
